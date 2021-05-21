from battle.businesslogic.effects.Effect import Effect
from cards.models import CardLevelEffects
from ..Calculator import Calculator


class DmgEffect(Effect):
    """
    Deals damage to player.
    """

    def __init__(self, effect_model: CardLevelEffects):
        super(DmgEffect, self).__init__(effect_model)

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()

        dmg = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        target.statistics.deal_damage(dmg)
