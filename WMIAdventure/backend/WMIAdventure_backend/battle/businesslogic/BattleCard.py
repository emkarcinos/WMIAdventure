from typing import List

from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect
from battle.businesslogic.effects.BattleCardEffectFactory import BattleCardEffectFactory
from cards.models import Card, CardEffect
from .CardBuff import CardBuff


class BattleCard:
    """

    """

    def __init__(self, card_model: Card):
        """
        Creates BattleCard instance.
        @param card_model: Database model.
        """

        self.card_model = card_model

        effects_factory = BattleCardEffectFactory.get_instance()
        self.effects = []
        for effect_model in card_model.effects.all():
            self.effects.append(effects_factory.create(effect_model))

    def use(self) -> List[BattleCardEffect]:
        """
        Updates card's buffs and returns list of card's effects to be executed in battle simulation.
        @return: List of effects to be executed by battle simulator.
        """

        self._update_effects()
        return self.effects

    def _update_effects(self) -> None:
        for effect in self.effects:
            effect.update()

    def assign_buff(self, buff: CardBuff, effect_type: CardEffect.EffectId):
        """
        This method assigns a buff to this card's appropriate effects.
        @param: buff - Buff instance
        @param: effect_type - Enum that will determine which effect will be boosted
        """
        for effect in self.effects:
            # We check if any of the effects if of the type specified in the parameter
            if effect.effect_model.card_effect.EffectId is effect_type:
                effect.add_buff(buff)
