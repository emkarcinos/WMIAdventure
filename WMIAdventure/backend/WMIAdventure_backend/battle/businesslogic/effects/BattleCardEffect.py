from typing import List

from battle.businesslogic.BattleCalculator import BattleCalculator
from battle.businesslogic.CardBuff import CardBuff
from cards.models import CardLevelEffects


class BattleCardEffect:
    """
    Abstract class for card effects logic to derive from when creating concrete effect class.
    """

    def calculate_effect_value(self):
        """
        Calculates the actual value that this effect does.
        @return: Value
        """

        return BattleCalculator.get_instance().calculate_effect_power(self.power, self.range, self.buffs)

    def __init__(self, effect_model: CardLevelEffects):
        """
        Creates BattleCardEffect instance.
        @param effect_model: Database model.
        """

        self.effect_model = effect_model

        self.target = effect_model.target
        self.power = effect_model.power
        self.range = effect_model.range

        self.buffs: List[CardBuff]
        self.buffs = []

    def activate(self,
                 card_owner,
                 other_player,
                 turns_queue):
        """
        This method should be overridden.
        By calling this method this effect will perform its logic.
        @param card_owner: BattlePlayer instance.
        @param other_player: BattlePlayer instance.
        @param turns_queue: Queue of players' turns, can be changed by some effects.
        @return:
        """

        pass

    def choose_target(self, card_owner, other_player):
        """
        Chooses effect target with usage of target enum field.
        @param card_owner: BattlePlayer instance.
        @param other_player: BattlePlayer instance.
        @return: Chosen effect target.
        """

        effect_target = None
        if self.target == CardLevelEffects.Target.OPPONENT:
            effect_target = other_player
        elif self.target == CardLevelEffects.Target.PLAYER:
            effect_target = card_owner
        return effect_target

    def add_buff(self, buff: CardBuff):
        """
        Add a new buff to the Effect.
        """
        self.buffs.append(buff)

    def update_buffs(self):
        """
        Updates the buffs and destroys expired ones.
        """
        for buff in self.buffs:
            buff.update()

        # Maybe there is a better way of doing this?
        for buff in self.buffs:
            if buff.is_expired():
                self.buffs.remove(buff)

    def update(self):
        """
        Update this effect's state.
        Should be called every turn before activation.
        """
        self.update_buffs()
