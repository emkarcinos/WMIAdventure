from .serializers import *
from .models import *
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


class CardsView(APIView):
    """
    All about cards.
    """

    def get(self, request, pk=None):
        objects = []
        try:
            # Get all card info's
            all_infos = list(CardInfo.objects.all())

            for info in all_infos:
                # Get cards with a given info
                cards = list(Card.objects.filter(info=info))
                cards_effects = []
                for card in cards:
                    # Get all effects for a given card
                    for e in list(CardLevelEffects.objects.filter(card=card)):
                        cards_effects.append(e)
                objects.append(WholeCardSerializer.translate_models(info, cards, cards_effects))

            serializer = WholeCardSerializer(objects, many=True)
            return Response(serializer.data)
        except CardInfo.DoesNotExist or CardLevelEffects.DoesNotExist or Card.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        card = request.data
        serializer = WholeCardSerializer(data=card)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)


class CardSingleView(APIView):
    """
    Single card views.
    """
