from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect


class HealEffect(Effect):
    """
    Heals the player.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        heal_amount = calculator.calculate_effect_power(self.power, self.range, self.buffs)
        target.statistics.heal(heal_amount)
