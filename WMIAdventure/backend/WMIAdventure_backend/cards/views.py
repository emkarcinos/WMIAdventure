from django.shortcuts import render
from rest_framework import status
from .models import CardEffect
from .serializers import CardEffectSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.


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
        item = CardEffect.objects.get(id=pk)
        serializer = CardEffectSerializer(item)
        return Response(serializer.data)

