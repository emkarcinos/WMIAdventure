from copy import copy

from battle.businesslogic.Player import Player
from battle.businesslogic.Statistics import Statistics


class SimplifiedPlayer:
    """
    This class stores player data in a simplified manner to avoid deepcopying player objects.
    """
    def __init__(self, player: Player):
        """
        Simplified player gets it's id from Player object.
        It also stores a copy of this Player's Statistics, and an array of it's cards ID's.
        """
        self.player_id = player.id
        self.stats = copy(player.statistics)

        # Create an array of ID's from player's deck
        self.card_ids = list(x.card_model.id for x in player.deck.cards_queue)

    def get_card_ids_in_order(self) -> list[int]:
        """
        Returns an ordered list of card ID's.
        "in order" means that the array represents an actual order of the player's cards within its deck.
        """
        return self.card_ids

    def get_id(self) -> int:
        """
        Returns an ID of a Player referenced by this object.
        """
        return self.player_id

    def get_stats(self) -> Statistics:
        """
        Returns a Statistics object tied to the Player
        """
        return self.stats