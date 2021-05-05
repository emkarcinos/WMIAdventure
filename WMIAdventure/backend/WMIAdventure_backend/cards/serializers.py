from rest_framework import serializers
from .models import CardEffect, CardLevel, CardInfo


class CardEffectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardEffect
        fields = ['id', 'name', 'tooltip']


class CardLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevel
        fields = ['level', 'name']


class CardInfoSerializer(serializers.ModelSerializer):
    """
    Manages serialization and deserialization of CardInfo instances.
    """

    class Meta:
        model = CardInfo
        fields = ['id', 'name', 'tooltip', 'image']
