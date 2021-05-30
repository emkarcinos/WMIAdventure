from typing import List, Union

from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.models import Card, CardEffect
from .Buff import Buff


class BattleCard:
    """

    """

    def __init__(self, card_model: Card):
        """
        Creates BattleCard instance.
        @param card_model: Database model.
        """

        self.card_model = card_model

        effects_factory = EffectFactory.get_instance()
        self.effects = []
        for effect_model in card_model.effects.all():
            self.effects.append(effects_factory.create(effect_model))

        self.turns_blocked = 0

    def use(self) -> List[Effect]:
        """
        Updates card's buffs and returns list of card's effects to be executed in battle simulation.
        @return: List of effects to be executed by battle simulator.
        """

        if self.turns_blocked > 0:
            self.turns_blocked -= 1
            return []  # If card is blocked it should be executed without effects.

        self._update_effects()
        return self.effects

    def _update_effects(self) -> None:
        for effect in self.effects:
            effect.update()

    def assign_buff(self, buff: Buff, effect_type: Union[CardEffect.EffectId, None] = None):
        """
        This method assigns a buff to this card's appropriate effects.
        @param: buff - Buff instance
        @param: effect_type - Enum that will determine which effect will be boosted
        """
        for effect in self.effects:
            # We check if any of the effects if of the type specified in the parameter
            # If we specified none, it applies to all effect types.
            card_type = effect.effect_model.card_effect.id
            if effect_type is None or card_type == effect_type:
                effect.add_buff(buff)
