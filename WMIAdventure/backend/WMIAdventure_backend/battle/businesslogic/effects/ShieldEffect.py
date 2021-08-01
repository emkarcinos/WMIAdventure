from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect
from cards.businesslogic.description_generator.PowerDescription import PowerDescription


class ShieldEffect(Effect):
    """
    Shields the player.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        shield_amount = calculator.calculate_effect_power(self.power, self.range, self.buffs)
        target.statistics.add_armour(shield_amount)

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Ochrania {self.target.label}a o {power_range}"
