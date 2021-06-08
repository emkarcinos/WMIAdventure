from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from IngameUsers.models import UserProfile
from battle.businesslogic.Battle import Battle
from battle.serializers import OutcomeSerializer
from users.models import User


class BattleView(APIView):
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
        TODO: when authentication is implemented require being logged in to access this view.
        Starts battle between logged in user and given user to attack.

        :param request: Incoming request, attacker user will be retrieved from it.
        :param defender_id: Id of user to attack.
        :return: Serialized battle Outcome, 404 if given user to attack does not exist or 400 if given attacker == defender.
        """

        attacker_id = request.user.id

        # TODO: When when authentication is implemented remove these lines of code.
        if attacker_id is None:
            attacker_id = User.objects.get(username="PumPkin").id

        # You can't fight with yourself.
        if attacker_id == defender_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            attacker_model = UserProfile.objects.get(pk=attacker_id)
            defender_model = UserProfile.objects.get(pk=defender_id)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        battle = Battle(attacker_model, defender_model)
        battle.start()

        serializer = OutcomeSerializer(instance=battle.outcome)
        return Response(serializer.data)
