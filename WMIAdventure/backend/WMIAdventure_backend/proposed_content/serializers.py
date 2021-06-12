from cards.serializers import base_whole_card_serializer_factory, base_simple_card_lvl_efcts_ser_factory, \
    base_simple_card_serializer_factory
from .models import *


class SimpleProposedCardLevelEffectsSerializer(base_simple_card_lvl_efcts_ser_factory(ProposedCardLevelEffects)):
    """
    See: cards.serializers.base_simple_card_lvl_efcts_ser_factory
    """


class SimpleProposedCardSerializer(base_simple_card_serializer_factory(ProposedCard,
                                                                       SimpleProposedCardLevelEffectsSerializer)):
    """
    See: cards.serializers.base_simple_card_serializer_factory
    """


class WholeProposedCardSerializer(base_whole_card_serializer_factory(ProposedCardInfo, SimpleProposedCardSerializer)):
    """
    (De)Serializes ProposedCard as a whole, packs all the information scattered across many models in one serializer.
    Information like:
    - proposed card name
    - proposed card image
    - proposed card tooltip
    - all possible proposed card's levels
    - all effects on given proposed card's level
    etc.

    See: cards.serializers.base_whole_card_serializer_factory
    """
