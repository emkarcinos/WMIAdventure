from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect


class ShieldEffect(Effect):
    """
    Shields the player.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        shield_amount = calculator.calculate_effect_power(self.power, self.range, self.buffs)
        target.statistics.add_armour(shield_amount)