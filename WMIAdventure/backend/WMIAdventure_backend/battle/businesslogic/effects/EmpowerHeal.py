from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Buff import Buff
from battle.businesslogic.effects.EmpowerCardEffect import EmpowerCardEffect
from cards.models import CardEffect


class EmpowerHeal(EmpowerCardEffect):
    """
    Empowers next card's damage effect.
    """
    def assign_buff_to_card(self, card_to_buff: BattleCard, buff: Buff):
        damage_effect = CardEffect.EffectId.HEAL
        card_to_buff.assign_buff(buff, damage_effect)
