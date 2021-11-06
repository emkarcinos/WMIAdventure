from copy import copy

from battle.businesslogic.Player import Player
from battle.businesslogic.Statistics import Statistics
from battle.businesslogic.recorder.SimplifiedDeck import SimplifiedDeck


class SimplifiedPlayer:
    """
    This class stores player data in a simplified manner to avoid deepcopying player objects.
    """

    def __init__(self, player: Player):
        """
        Simplified player gets it's id from Player object.
        It also stores a copy of this Player's Statistics, and SimplifiedDeck.
        """
        self.player_id = player.id
        self.stats = copy(player.statistics)

        # Create simplified player's deck
        self.deck = SimplifiedDeck(player.deck)

    def __str__(self):
        return f"Simplified Player {self.player_id}"

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
