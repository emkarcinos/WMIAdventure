from battle.businesslogic.effects.EmpowerCardEffect import EmpowerCardEffect
from cards.businesslogic.description_generator.PowerDescription import PowerDescription
from cards.models import CardEffect


class EmpowerDamage(EmpowerCardEffect):
    """
    Empowers next card's damage effect.
    """

    def assign_buff_to_card(self, card_to_buff, buff):
        damage_effect = CardEffect.EffectId.DMG
        card_to_buff.assign_buff(buff, damage_effect)

    def description(self) -> str:
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Wzmacnia obrażenia następnej karty {self.target.label}a o {power_range}"
