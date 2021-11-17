from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.SimplifiedDeck import SimplifiedDeck
from battle.businesslogic.recorder.simplified_players.BaseSimplifiedPlayer import BaseSimplifiedPlayer


class BattleStartPlayer(BaseSimplifiedPlayer):
    """
    Stores data of player before first turn.

    Class used in battle serialization.
    """

    def __init__(self, player: Player):
        super().__init__(player)

        self.deck = SimplifiedDeck(player.deck)
