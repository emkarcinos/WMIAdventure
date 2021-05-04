from rest_framework import status
from .models import CardLevel
from .serializers import CardLevelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics


class CardLevelList(APIView):

    def get(self, request):
        """
        List of Card Levels.
        """

        serializer = CardLevelSerializer(CardLevel.objects.all(), many=True)
        return Response(serializer.data)


class CardLevelDetail(generics.RetrieveAPIView):
    """
    View displaying details about CardLevel.
    """

    queryset = CardLevel.objects.all()
    serializer_class = CardLevelSerializer
