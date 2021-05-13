from WMIAdventure_backend.cards.models import CardLevelEffects
from .BattlePlayer import BattlePlayer


class BattleCardEffect:
    """
    Abstract class for card effects logic to derive from when creating concrete effect class.
    """

    def __init__(self, effect_model: CardLevelEffects):
        """
        Creates BattleCardEffect instance.
        @param effect_model: Database model.
        """

        self.target = effect_model.target
        self.power = effect_model.power
        self.range = effect_model.range

    def activate(self, card_owner: BattlePlayer, other_player: BattlePlayer, turns_queue):
        """
        This method should be overridden.
        By calling this method this effect will perform its logic.
        @param card_owner:
        @param other_player:
        @param turns_queue: Queue of players' turns, can be changed by some effects.
        @return:
        """

        pass
