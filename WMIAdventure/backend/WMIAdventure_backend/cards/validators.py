from rest_framework import serializers

from cards.models import CardEffect


def validate_effect_modifiers(card_effect: CardEffect, power: int or None, range_: float or None):
    """
    Checks if given card effect should have modifiers and checks if they were provided.
    If they were not provided raises ValidationError.

    :param card_effect: Given card effect.
    :param power: Given power data.
    :param range_: Given power range data.
    :return: None.
    :raise: serializers.ValidationError
    """

    if card_effect.has_modifier:
        if power is None or range_ is None:
            raise serializers.ValidationError("All effect's modifiers must be provided.")
