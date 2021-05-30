from .Player import Player
from .TurnsQueue import TurnsQueue


class Coordinator:
    """
    This class is responsible for handling battle logic.
    Stores players and runs their turns.
    """

    def __init__(self, attacker: Player, defender: Player) -> None:
        self.attacker = attacker
        self.defender = defender
        self.turnsQueue = TurnsQueue(self.attacker, self.defender)

    def get_players_opponent(self, player) -> Player:
        # Effect activation requires a target player as an argument, so we calculate this here.
        return self.defender if player is self.attacker else self.attacker

    def next_turn(self) -> None:
        current_player = self.turnsQueue.turn()

        used_effects = current_player.use_card()
        for effect in used_effects:
            effect.activate(current_player, self.get_players_opponent(current_player), self.turnsQueue)

