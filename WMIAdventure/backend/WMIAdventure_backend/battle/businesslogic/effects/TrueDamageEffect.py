from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.recorder.effects_impacts.StatsChangedEffectImpact import StatsChangedEffectImpact
from cards.businesslogic.description_generator.PowerDescription import PowerDescription


class TrueDamageEffect(Effect):
    """
    This effect deals damage that cannot be blocked by one's shield.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        dmg = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        target.statistics.deal_true_damage(dmg)

        return StatsChangedEffectImpact(self.effect_model.card_effect.id, dmg, target.id, target.statistics)

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Zadaje {self.target.label}owi {power_range} nieuchronnych obrażeń"
