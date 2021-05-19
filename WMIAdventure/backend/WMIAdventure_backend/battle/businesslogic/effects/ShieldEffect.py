from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect


class ShieldEffect(BattleCardEffect):
    """
    Shields the player.
    """

    def activate(self,
                 card_owner,
                 other_player,
                 turns_queue):

        shield_amount = self.calculate_effect_value()
        shield_receiver = self.choose_target(card_owner, other_player)
        shield_receiver.statistics.add_armour(shield_amount)