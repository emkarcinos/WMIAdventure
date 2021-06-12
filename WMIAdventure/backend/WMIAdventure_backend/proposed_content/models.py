from cards.models import base_card_factory, base_card_info_factory, base_card_level_effects_factory


class ProposedCardInfo(base_card_info_factory('proposed_content/cards/images/')):
    """
    Stores generic information about proposed card.

    See: BaseCardInfo which is inner class in cards.models.base_card_info_factory function.
    """

    pass


class ProposedCard(base_card_factory(ProposedCardInfo)):
    """
    Stores information about concrete level of proposed card.

    See: BaseCard which is inner class in cards.models.base_card_factory function.
    """

    pass


class ProposedCardLevelEffects(base_card_level_effects_factory(ProposedCard)):
    """
    Couples ProposedCard objects with its effects.

    See: BaseCardLevelEffects which is inner class in cards.models.base_card_level_effects_factory function.
    """

    pass
