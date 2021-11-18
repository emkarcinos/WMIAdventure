from copy import copy

from battle.businesslogic.Player import Player


class BaseSimplifiedPlayer:
    """
    This class stores player data in a simplified manner.

    Used in serialization of battle.
    """

    def __init__(self, player: Player):
        self.id = player.id
        self.stats = copy(player.statistics)
