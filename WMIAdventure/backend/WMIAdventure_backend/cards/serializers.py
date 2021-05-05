from rest_framework import serializers
from .models import CardEffect, CardLevel, Card


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