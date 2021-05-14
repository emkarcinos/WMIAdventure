from .BattlePlayer import BattlePlayer
from .TurnsQueue import TurnsQueue


class Coordinator:
    """
    This class is responsible for handling battle logic.
    Stores players and runs their turns.
    """

    def __init__(self, attacker: BattlePlayer, defender: BattlePlayer) -> None:
        self.attacker = attacker
        self.defender = defender
        self.turnsQueue = TurnsQueue(self.attacker, self.defender)

    def next_turn(self):
        current_player = self.turnsQueue.turn()

        # TODO: Implement logic after merging pull requests
