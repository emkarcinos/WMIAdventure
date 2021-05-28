from typing import Union

from battle.businesslogic.Buff import Buff
from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.Effect import Effect
from cards.models import CardLevelEffects, CardEffect


class EmpowerCardEffect(Effect):
    """
    Generic card empowering.
    Adds a modifier to the next card.
    """
    target_effect: Union[CardEffect.EffectId, None]

    def __init__(self, effect_model: CardLevelEffects, target_effect: Union[CardEffect.EffectId, None] = None):
        self.target_effect = target_effect
        super().__init__(effect_model)

    def on_activation(self, target: Player, turns_queue):
        calculator = Calculator.get_instance()
        emp_ammount = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        card_to_buff = target.deck.lookup()

        buff = Buff(modifier=emp_ammount)
        card_to_buff.assign_buff(buff, self.target_effect)
