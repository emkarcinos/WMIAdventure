from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from IngameUsers.models import UserProfile
from battle.businesslogic.Battle import Battle
from battle.serializers import OutcomeSerializer


class BattleView(APIView):
    """
    **get**: \n
    - Starts battle between logged in user (retrieved from incoming request) and given user to attack (defender_id). \n
    - Returns serialized battle Outcome. \n
    """

    def get(self, request, defender_id: int):
        """
        TODO: when authentication is implemented require being logged in to access this view.
        Starts battle between logged in user and given user to attack.

        :param request: Incoming request, attacker user will be retrieved from it.
        :param defender_id: Id of user to attack.
        :return: Serialized battle Outcome or 404 if given user to attack does not exist.
        """

        attacker_id = request.user.id

        try:
            attacker_model = UserProfile.objects.get(pk=attacker_id)
            defender_model = UserProfile.objects.get(pk=defender_id)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        battle = Battle(attacker_model, defender_model)
        battle.start()

        serializer = OutcomeSerializer(instance=battle.outcome)
        return Response(serializer.data)
