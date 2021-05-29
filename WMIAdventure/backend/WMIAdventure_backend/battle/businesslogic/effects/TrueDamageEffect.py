from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect


class TrueDamageEffect(Effect):
    """
    This effect deals damage that cannot be blocked by one's shield.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        dmg = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        target.statistics.deal_true_damage(dmg)
