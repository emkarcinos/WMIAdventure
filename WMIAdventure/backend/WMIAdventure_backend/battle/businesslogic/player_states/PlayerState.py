class PlayerState:
    """
    Abstract PlayerState class.
    """

    def __init__(self, turns_active: int):
        self.turns_active = turns_active
        self.active = True

    def update(self):
        self.turns_active = max(0, self.turns_active - 1)
        if self.turns_active <= 0:
            self.active = False

    def player_uses_card(self, card_to_use):
        """
        This method should be overridden in classes deriving from PlayerState class.
        :param card_to_use: Card to be used by player.
        :return: Modified card to be used or None.
        """

        return card_to_use
