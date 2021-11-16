from battle.businesslogic.Calculator import Calculator
from battle.businesslogic.buffs.ModifierBuff import ModifierBuff
from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.recorder.effects_impacts.CardBuffedEffectImpact import CardBuffedEffectImpact
from cards.businesslogic.description_generator.PowerDescription import PowerDescription


class EmpowerCardEffect(Effect):
    """
    Generic card empowering.
    Adds a modifier to the next card.
    """

    def on_activation(self, target, turns_queue):
        calculator = Calculator.get_instance()
        emp_amount = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        card_to_buff = target.deck.lookup()

        buff = self.assign_buff_to_card(card_to_buff, emp_amount)

        return CardBuffedEffectImpact(self.effect_model.card_effect.id, target.id, buff, card_to_buff)

    def assign_buff_to_card(self, card_to_buff, emp_amount) -> ModifierBuff:
        """
        This method may be overridden if one wishes to assign a buff to a specific effect.

        :return: Assigned ModifierBuff.
        """

        buff = ModifierBuff(buff_type=None, modifier=emp_amount)
        card_to_buff.assign_buff(buff)
        return buff

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Wzmacnia działanie następnej karty {self.target.label}a o {power_range}"
