from .models import CardEffect
from .serializers import CardEffectSerializer
from .models import CardLevel
from .serializers import CardLevelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status


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


class CardEffectList(APIView):
    """
    List all effects.
    """
    def get(self, request, *args, **kwargs):
        cardEffects = CardEffect.objects.all()
        serializer = CardEffectSerializer(cardEffects, many=True)
        return Response(serializer.data)


class CardEffectObjectView(APIView):
    """
    Get a single effect.
    """
    def get(self, request, pk=None):
        try:
            item = CardEffect.objects.get(id=pk)
        except CardEffect.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CardEffectSerializer(item)
        return Response(serializer.data)
