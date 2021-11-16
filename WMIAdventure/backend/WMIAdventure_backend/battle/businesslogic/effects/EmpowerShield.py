from battle.businesslogic.buffs.ModifierBuff import ModifierBuff
from battle.businesslogic.effects.EmpowerCardEffect import EmpowerCardEffect
from cards.businesslogic.description_generator.PowerDescription import PowerDescription
from cards.models import CardEffect


class EmpowerShield(EmpowerCardEffect):
    """
    Empowers next card's shield effect.
    """

    def assign_buff_to_card(self, card_to_buff, emp_amount) -> ModifierBuff:
        buff = ModifierBuff(buff_type=CardEffect.EffectId.SHIELD, modifier=emp_amount)
        card_to_buff.assign_buff(buff)
        return buff

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Wzmacnia efekt tarczy następnej karty {self.target.label}a o {power_range}"
