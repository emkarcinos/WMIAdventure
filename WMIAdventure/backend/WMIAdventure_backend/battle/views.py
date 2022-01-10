from ratelimit.core import get_usage
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from IngameUsers.models import UserProfile
from battle.businesslogic.BadBattleProfileException import BadBattleProfileException
from battle.businesslogic.Battle import Battle
from battle.businesslogic.battle_limiting import can_user_fight, per_player_limit_key
from battle.businesslogic.battle_limiting import when_will_fight_limit_reset
from battle.serializers import BattleSerializer


class BattleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    per_user_rate = '2/5h'

    """
    **get**:

    - Starts battle between logged in user (retrieved from incoming request, **attacker_id**) and given user to attack
    (**defender_id**).
    - Returns:
        - If everything good: serialized battle Outcome.
        - If given user to attack (defender_id) does not exist: 404 Not Found.
        - If you try to attack self (attacker_id == defender_id): 400 Bad Request.
    """

    def get(self, request, defender_id: int):
        """
        Starts battle between logged in user and given user to attack.

        :param request: Incoming request, attacker user will be retrieved from it.
        :param defender_id: Id of user to attack.
        :return: Serialized battle Outcome, 404 if given user to attack does not exist or 400 if given attacker == defender.
        """

        attacker_id = request.user.id

        # You can't fight with yourself.
        if attacker_id == defender_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        can_fight = can_user_fight(attacker_id)
        if not can_fight:
            when_can_fight = when_will_fight_limit_reset(attacker_id)
            return Response(status=status.HTTP_403_FORBIDDEN, data={'seconds_till_limit_reset': when_can_fight.seconds})

        try:
            attacker_model = UserProfile.objects.get(pk=attacker_id)
            defender_model = UserProfile.objects.get(pk=defender_id)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            battle = Battle(attacker_model, defender_model)
        except BadBattleProfileException as e:
            return Response(status=status.HTTP_404_NOT_FOUND, data=str(e))

        def limiting_key(grp, req):
            return per_player_limit_key(attacker_id, defender_id)

        usage = get_usage(request, fn=BattleView, key=limiting_key,
                          rate=BattleView.per_user_rate, increment=True)
        if usage is not None and usage.get('should_limit', False):
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(usage))

        battle.start()
        if battle.outcome.get_winner().id == attacker_id:
            get_usage(request, fn=BattleView, key=limiting_key,
                      rate=BattleView.per_user_rate, increment=True)

        serializer = BattleSerializer(instance=battle)
        return Response(serializer.data)
