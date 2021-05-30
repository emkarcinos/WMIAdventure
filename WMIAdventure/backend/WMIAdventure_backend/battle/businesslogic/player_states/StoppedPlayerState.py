from battle.businesslogic.player_states.PlayerState import PlayerState


class StoppedPlayerState(PlayerState):
    def player_uses_card(self, card_to_use):
        """
        Stops player's turn by replacing card to use with None.
        :param card_to_use: Card to be used.
        :return: None - to disable player's turn.
        """

        return None
