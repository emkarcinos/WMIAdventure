from cards.models import CardLevelEffects


class BattleCardEffect:
    """
    Abstract class for card effects logic to derive from when creating concrete effect class.
    """

    def __init__(self, effect_model: CardLevelEffects):
        """
        Creates BattleCardEffect instance.
        @param effect_model: Database model.
        """

        self.effect_model = effect_model

        self.target = effect_model.target
        self.power = effect_model.power
        self.range = effect_model.range

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
