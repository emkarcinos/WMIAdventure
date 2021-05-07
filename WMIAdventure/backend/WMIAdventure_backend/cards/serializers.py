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


class SimpleCardLevelEffectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardLevelEffects
        fields = ['card_effect', 'target', 'power', 'range']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'info', 'level', 'next_level_cost']


class SimpleCardSerializer(serializers.ModelSerializer):
    effects = SimpleCardLevelEffectsSerializer(many=True)

    class Meta:
        model = Card
        fields = ['level', 'next_level_cost', 'effects']


class WholeCardSerializer(serializers.ModelSerializer):
    """
    (De)Serializes Card as a whole, packs all the information scattered across many models in one serializer.
    Information like:
    - card name
    - card image
    - card tooltip
    - all possible card's levels
    - all effects on given card's level
    etc.
    """

    levels = SimpleCardSerializer(many=True, required=False)
    subject = serializers.CharField(max_length=50, allow_null=True)

    class Meta:
        model = CardInfo
        fields = ['id', 'name', 'subject', 'image', 'tooltip', 'levels']

    def create(self, validated_data):
        info = CardInfo.objects.create(
            name=validated_data.get('name'),
            tooltip=validated_data.get('tooltip'),
            image=validated_data.get('image', None),
            subject=validated_data.get('subject')
        )
        info.save()

        for card_data in validated_data.get("levels", []):
            card = info.levels.create(
                level=card_data.get("level"),
                next_level_cost=card_data.get("next_level_cost"),
            )
            for effect_data in card_data.get("effects"):
                card.effects.create(
                    card_effect=effect_data.get("card_effect"),
                    target=effect_data.get("target", CardLevelEffects.Target.OPPONENT),
                    power=effect_data.get("power"),
                    range=effect_data.get("range")
                )

        return info

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.tooltip = validated_data.get('tooltip', instance.tooltip)
        instance.image = validated_data.get('image', instance.image)
        instance.subject = validated_data.get('subject')

        cards_data = validated_data.get("levels", None)
        if cards_data:
            instance.levels.all().delete()

            for card_data in cards_data:
                card = instance.levels.create(
                    level=card_data.get("level"),
                    next_level_cost=card_data.get("next_level_cost"),
                )
                for effect_data in card_data.get("effects"):
                    card.effects.create(
                        card_effect=effect_data.get("card_effect"),
                        target=effect_data.get("target", CardLevelEffects.Target.OPPONENT),
                        power=effect_data.get("power"),
                        range=effect_data.get("range")
                    )

        return instance
