import random

import factory
from factory.django import DjangoModelFactory

from cards.models import CardLevel, CardEffect, CardLevelEffects, Card


class CardInfoFactory(DjangoModelFactory):
    """
    Creates CardInfo.
    """

    class Meta:
        model = "cards.CardInfo"

    name = factory.Sequence(lambda n: f"fake_card_{str(n)}")
    tooltip = "tooltip"
    subject = "subject"


class CardFactory(DjangoModelFactory):
    """
    Creates Card and it's related CardInfo object.
    """

    class Meta:
        model = "cards.Card"

    info = factory.SubFactory(CardInfoFactory)
    effects_description = "effects desc"

    next_level_cost = factory.Faker('random_int', max=100)
    level = factory.LazyAttribute(lambda obj: random.choice(CardLevel.objects.all()))


class CardLevelEffectsFactory(DjangoModelFactory):
    """
    Creates CardLevelEffectsFactory - you must provide existing card.

    If no effect is provided, then DMG effect is used by default.
    """

    class Meta:
        model = "cards.CardLevelEffects"

    card_effect = factory.LazyAttribute(lambda obj: CardEffect.objects.get(id=CardEffect.EffectId.DMG))

    target = factory.Faker('random_element', elements=CardLevelEffects.Target)

    power = factory.Faker('random_int', min=5, max=20)
    range = factory.Faker('random_int', min=5, max=20)

    @factory.post_generation
    def handle_modifiers(obj, create, extracted, **kwargs):
        if create:
            # If creating, check if modifiers should be removed.
            if not obj.card_effect.has_modifier:
                obj.power = None
                obj.range = None


class EffectData:
    """
    Stores all data needed to create effects in factories.
    """
    target: CardLevelEffects.Target
    range: float
    power: int
    id: CardEffect.EffectId

    def __init__(self, id_, power, range_, target=CardLevelEffects.Target.OPPONENT):
        self.id = id_
        self.power = power
        self.range = range_
        self.target = target


def create_card_with_effect(
        effect_id: CardEffect.EffectId = CardEffect.EffectId.DMG,
        target=CardLevelEffects.Target.OPPONENT,
        level: CardLevel.Level = CardLevel.Level.COMMON,
        power: int = 10,
        range_: float = 5
) -> Card:
    """
    Creates card with given effect.

    :param effect_id:
    :param target:
    :param level:
    :param power:
    :param range_:
    :return: Created card.
    """

    card_effect = CardEffect.objects.get(pk=effect_id)
    card_level = CardLevel.objects.get(pk=level)

    card = CardFactory(level=card_level)
    CardLevelEffectsFactory(
        card=card,
        card_effect=card_effect,
        target=target,
        power=power,
        range=range_
    )

    return card


def create_card_with_effects(effects_data: list[EffectData], level=CardLevel.Level.COMMON) -> Card:
    """
    Creates card with given effects data.
    :param effects_data:
    :param level:
    :return: Created card.
    """

    card_level = CardLevel.objects.get(pk=level)

    card = CardFactory(level=card_level)

    for effect_data in effects_data:
        card_effect = CardEffect.objects.get(pk=effect_data.id)
        CardLevelEffectsFactory(
            card=card,
            card_effect=card_effect,
            target=effect_data.target,
            power=effect_data.power,
            range=effect_data.range
        )

    return card
