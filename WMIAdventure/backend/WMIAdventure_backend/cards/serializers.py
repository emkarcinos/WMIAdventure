from rest_framework import serializers
from .models import *


class CardEffectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardEffect
        fields = ['id', 'name', 'tooltip']


class CardLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevel
        fields = ['level', 'name']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'info', 'level', 'next_level_cost']


class CardInfoSerializer(serializers.ModelSerializer):
    """
    Manages serialization and deserialization of CardInfo instances.
    """

    class Meta:
        model = CardInfo
        fields = ['id', 'name', 'tooltip', 'image']


class CardLevelEffectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevelEffects
        fields = ['id', 'card', 'card_effect', 'target', 'power', 'range']
