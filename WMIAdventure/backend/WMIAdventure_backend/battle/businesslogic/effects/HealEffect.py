from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect
from cards.businesslogic.description_generator.PowerDescription import PowerDescription


class HealEffect(Effect):
    """
    Heals the player.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        heal_amount = calculator.calculate_effect_power(self.power, self.range, self.buffs)
        target.statistics.heal(heal_amount)

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Leczy {self.target.label}a o {power_range}"