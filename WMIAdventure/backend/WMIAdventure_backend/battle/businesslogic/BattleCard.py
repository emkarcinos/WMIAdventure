from typing import List

from cards.models import Card
from .BattleCardEffectFactory import BattleCardEffectsFactory
from .CardBuff import CardBuff


class BattleCard:
    """

    """
    buffs: List[CardBuff]

    def __init__(self, card_model: Card):
        """
        Creates BattleCard instance.
        @param card_model: Database model.
        """

        self.card_model = card_model

        effects_factory = BattleCardEffectsFactory.get_instance()
        self.effects = []
        for effect_model in card_model.effects.all():
            self.effects.append(effects_factory.create(effect_model))

        self.buffs = []

    def use(self):
        """
        Updates card's buffs and returns list of card's effects to be executed in battle simulation.
        @return: List of effects to be executed by battle simulator.
        """

        self._update_buffs()
        return self.effects

    def _update_buffs(self):
        for buff in self.buffs:
            buff.update()
