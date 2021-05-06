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


# Serializers for entire card view
class MetaEffectSerializer(serializers.Serializer):
    """
    Serializes an effect from a card.
    """
    class Meta:
        def __init__(self, id=None, target=None, power=None, range=None):
            self.id = id
            self.target = target
            self.power = power
            self.range = range

    id = serializers.IntegerField()
    target = serializers.IntegerField()
    power = serializers.IntegerField(allow_null=True)
    range = serializers.FloatField(allow_null=True)

    def create(self, validated_data):
        pass


class MetaLevelSerializer(serializers.Serializer):
    """
    Serializes a level with its effects.
    """

    class Meta:
        def __init__(self, level=None, upgradeCost=None, effects=None):
            self.level = level
            self.upgradeCost = upgradeCost
            self.effects = effects

    level = serializers.IntegerField()
    upgradeCost = serializers.IntegerField(allow_null=True)
    effects = MetaEffectSerializer(many=True, allow_null=True)

    def create(self, validated_data):
        pass


class WholeCardSerializer(serializers.Serializer):
    """
    Serializes an entire card object.
    This serializer may create a new Card, CardInfo model objects.
    """

    class Meta:
        def __init__(self, name=None, subject=None, image=None, tooltip=None, levels=None):
            self.name = name
            self.subject = subject
            self.image = image
            self.tooltip = tooltip
            self.levels = levels

    name = serializers.CharField()
    subject = serializers.CharField(allow_null=True)
    image = serializers.ImageField(allow_null=True)
    tooltip = serializers.CharField(allow_null=True)
    levels = MetaLevelSerializer(many=True)

    @staticmethod
    def translate_models(card_info):
        """
        Translates models into classes understood by the serializer.

        @param card_info: CardInfo instance
        @param cards: An array of Card instances
        @param card_level_effects: An array of CardLevelEffects instances

        @return: WholeCardSerializer.Meta object instance.
        """
        cards = list(Card.objects.filter(info=card_info))
        card_level_effects = []
        for card in cards:
            # Get all effects for a given card
            for e in list(CardLevelEffects.objects.filter(card=card)):
                card_level_effects.append(e)

        whole = WholeCardSerializer.Meta(name=card_info.name,
                                         tooltip=card_info.tooltip,
                                         subject=None,
                                         image=card_info.image)
        levels = []
        for c in cards:
            level = MetaLevelSerializer.Meta(level=c.level.level,
                                             upgradeCost=c.next_level_cost)
            level.effects = []
            levels.append(level)
        for effect in card_level_effects:
            meta_effect = MetaEffectSerializer.Meta(id=effect.card_effect.id,
                                                    target=effect.target,
                                                    power=effect.power,
                                                    range=effect.range)
            # We insert this meta_effect to appropriate meta level
            levels[effect.card.level.level - 1].effects.append(meta_effect)

        whole.levels = levels
        return whole

    def create(self, validated_data) -> dict:
        """
        This serializer actually creates multiple model object -
        For each "card" (abstractly speaking), we need CardInfo, multiple Cards (one per level),
        and multiple CardLevelEffects (one per level and per effect).

        Returns a dictionary of:
            'info' - Created CardInfo model instance,
            'cards' - An array of created Card model instances,
            'cardLevelEffects' - An array of created CardLevelEffects model instance
        """

        # Create new Info model instance
        info = CardInfo()
        info.name = validated_data.get('name', info.name)
        info.image = validated_data.get('image', info.image)
        info.tooltip = validated_data.get('tooltip', info.tooltip)

        info.save()

        # Storing return value here
        created_objects = {'info': info,
                           'cards': [],
                           'cardLevelEffects': []}

        for level in validated_data.get('levels'):
            # We have multiple levels in JSON, so we have to parse it to our models.
            new_card = Card(info=info)
            # For each level we have to create a new Card model instance.
            # Levels are already inside the database, so we get one before assigning.
            new_card.level = CardLevel.objects.get(pk=level['level'])
            new_card.next_level_cost = level.get('upgradeCost')

            new_card.save()
            created_objects['cards'].append(new_card)
            for effect in level.get('effects'):
                # One may have multiple effects on a single card level.

                new_card_level_effects = CardLevelEffects(card=new_card)
                # Card effects are already in the database, so we get one before assigning.
                new_card_level_effects.card_effect = CardEffect.objects.get(pk=effect['id'])
                new_card_level_effects.target = effect.get('target')
                new_card_level_effects.power = effect.get('power')
                new_card_level_effects.range = effect.get('range')

                new_card_level_effects.save()
                created_objects['cardLevelEffects'].append(new_card_level_effects)

        return created_objects

    def update(self, instance, validated_data):
        # Create new Info model instance
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.tooltip = validated_data.get('tooltip', instance.tooltip)

        instance.save()

        # Storing return value here
        created_objects = {'info': instance,
                           'cards': [],
                           'cardLevelEffects': []}

        for level in validated_data.get('levels'):
            # We have multiple levels in JSON, so we have to parse it to our models.
            card = Card.objects.get(info=instance, level=level['level'])
            # For each level we have to create a new Card model instance.
            # Levels are already inside the database, so we get one before assigning.
            card.level = CardLevel.objects.get(pk=level['level'])
            card.next_level_cost = level.get('upgradeCost')

            card.save()
            created_objects['cards'].append(card)
            for effect in level.get('effects'):
                # One may have multiple effects on a single card level.

                new_card_level_effects = CardLevelEffects.objects.get(card=card, card_effect=effect['id'])
                # Card effects are already in the database, so we get one before assigning.
                new_card_level_effects.card_effect = CardEffect.objects.get(pk=effect['id'])
                new_card_level_effects.target = effect.get('target')
                new_card_level_effects.power = effect.get('power')
                new_card_level_effects.range = effect.get('range')

                new_card_level_effects.save()
                created_objects['cardLevelEffects'].append(new_card_level_effects)

        return created_objects



