from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.SimplifiedPlayer import SimplifiedPlayer


class State:
    """
    Battle State class - holds two SimplifiedPlayer objects. Represents a single turn.
    """

    def __init__(self, attacker: Player, defender: Player):
        self.attacker = SimplifiedPlayer(attacker)
        self.defender = SimplifiedPlayer(defender)

    def get_attacker(self) -> SimplifiedPlayer:
        """
        Returns attacker Player object.
        """
        return self.attacker

    def get_defender(self) -> SimplifiedPlayer:
        """
        Returns defender Player object.
        """
        return self.defender
