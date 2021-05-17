from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect
from cards.models import CardLevelEffects
from ..BattleCalculator import BattleCalculator


class DmgEffect(BattleCardEffect):
    """
    Deals damage to player.
    """

    def __init__(self, effect_model: CardLevelEffects):
        super(DmgEffect, self).__init__(effect_model)

    def activate(self,
                 card_owner,
                 other_player,
                 turns_queue):
        calculator = BattleCalculator.get_instance()

        dmg = calculator.calculate_effect_power(self.power, self.range, self.buffs)

        dmg_receiver = self.choose_target(card_owner, other_player)

        calculator.deal_dmg_to(dmg_receiver, dmg)
