from django.core.exceptions import ValidationError
from rest_framework import serializers

from cards.models import CardEffect, CardLevel

MAX_EFFECTS_PER_LEVEL = 5


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


def validate_file_size(value):
    filesize = value.size

    if filesize > 1048576:
        raise ValidationError("The maximum file size that can be uploaded is 1MB")
    else:
        return value


def validate_does_not_exceed_effect_per_level_limit(effects: list[CardEffect]):
    if len(effects) > MAX_EFFECTS_PER_LEVEL:
        raise serializers.ValidationError(f"Cards can only have up to {MAX_EFFECTS_PER_LEVEL} effect per level")
