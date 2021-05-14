from typing import List

from cards.models import Card
from .BattleCardEffect import BattleCardEffect


class BattleCard:
    """

    """
    effects: List[BattleCardEffect]

    def __init__(self, card_model: Card):
        """
        Creates BattleCard instance.
        @param card_model: Database model.
        """

        self.effects = []
        for effect_model in card_model.effects.all():
            self.effects.append(BattleCardEffect(effect_model))
