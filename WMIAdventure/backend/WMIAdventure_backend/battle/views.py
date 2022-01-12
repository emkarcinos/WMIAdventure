from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from IngameUsers.models import UserProfile
from battle.businesslogic.BadBattleProfileException import BadBattleProfileException
from battle.businesslogic.Battle import Battle
from battle.businesslogic.battle_limiting import per_player_limit_key, player_limit_key
from battle.serializers import BattleSerializer
from lib.ratelimit.ratelimit import get_usage, Limits


class BattleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    same_opponent_rate = Limits(2, 'hours', 6)
    per_player_rate = Limits(20, 'hours', 1)

    """
    **post**:

    - Starts battle between logged in user (retrieved from incoming request, **attacker_id**) and given user to attack
    (**defender_id**).
    - Returns:
        - If everything good: serialized battle Outcome.
        - If given user to attack (defender_id) does not exist: 404 Not Found.
        - If you try to attack self (attacker_id == defender_id): 400 Bad Request.
        
    **get**
    
    - Returns data about current limits.
    """

    def get(self, request, defender_id: int):
        attacker_id = request.user.id
        if not UserProfile.objects.filter(pk=attacker_id).exists() or \
                not UserProfile.objects.filter(pk=defender_id).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        per_player_key = player_limit_key(attacker_id)
        with_enemy_key = per_player_limit_key(attacker_id, defender_id)

        global_limit_data = get_usage(
            per_player_key,
            BattleView.per_player_rate.limit,
            BattleView.per_player_rate.period,
            BattleView.per_player_rate.period_count,
            False
        )

        two_users_limit_data = get_usage(
            with_enemy_key,
            BattleView.same_opponent_rate.limit,
            BattleView.same_opponent_rate.period,
            BattleView.same_opponent_rate.period_count,
            False
        )

        return Response(status=status.HTTP_200_OK, data={
            "perUser": two_users_limit_data.as_dict(),
            "global": global_limit_data.as_dict(),
        })

    def post(self, request, defender_id: int):
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

        per_player_key = player_limit_key(attacker_id)
        with_enemy_key = per_player_limit_key(attacker_id, defender_id)

        per_player_usage = get_usage(
            per_player_key,
            BattleView.per_player_rate.limit,
            BattleView.per_player_rate.period,
            BattleView.per_player_rate.period_count,
        )
        if per_player_usage.should_limit:
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={'seconds_till_limit_reset': per_player_usage.get_time_left()}
            )

        try:
            attacker_model = UserProfile.objects.get(pk=attacker_id)
            defender_model = UserProfile.objects.get(pk=defender_id)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            battle = Battle(attacker_model, defender_model)
        except BadBattleProfileException as e:
            return Response(status=status.HTTP_404_NOT_FOUND, data=str(e))

        with_opponent_usage = get_usage(
            with_enemy_key,
            BattleView.same_opponent_rate.limit,
            BattleView.same_opponent_rate.period,
            BattleView.same_opponent_rate.period_count,
        )
        if with_opponent_usage.should_limit:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=str(with_opponent_usage.as_dict()))

        battle.start()
        get_usage(
            per_player_key,
            BattleView.per_player_rate.limit,
            BattleView.per_player_rate.period,
            BattleView.per_player_rate.period_count,
            True
        )
        get_usage(
            with_enemy_key,
            BattleView.same_opponent_rate.limit,
            BattleView.same_opponent_rate.period,
            BattleView.same_opponent_rate.period_count,
            True
        )
        if battle.outcome.get_winner() is not None and battle.outcome.get_winner().id == attacker_id:
            get_usage(
                with_enemy_key,
                BattleView.same_opponent_rate.limit,
                BattleView.same_opponent_rate.period,
                BattleView.same_opponent_rate.period_count,
                True
            )

        serializer = BattleSerializer(instance=battle)
        return Response(serializer.data)
