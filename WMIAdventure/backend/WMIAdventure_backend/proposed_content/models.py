from django.conf import settings
from django.db import models

from cards.models import base_card_factory, base_card_info_factory, base_card_level_effects_factory


class ProposedCardInfo(base_card_info_factory('proposed_content/cards/images/')):
    """
    Stores generic information about proposed card.

    See: BaseCardInfo which is inner class in cards.models.base_card_info_factory function.
    """

    comment = models.TextField(help_text="Comment field for users to send a message to the admins alongside their "
                                         "created card",
                               null=True,
                               blank=True,
                               max_length=150)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        help_text="A reference to Django user model"
    )


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
