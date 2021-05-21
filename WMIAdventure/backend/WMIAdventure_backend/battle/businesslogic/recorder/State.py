from battle.businesslogic.Player import Player


class State:
    """
    Battle State class - holds two SimplifiedPlayer objects. Represents a single turn.
    """

    def __init__(self, attacker: Player, defender: Player):
        self.attacker = attacker
        self.defender = defender

    def get_attacker(self) -> Player:
        """
        Returns attacker Player object.
        """
        return self.attacker

    def get_defender(self) -> Player:
        """
        Returns defender Player object.
        """
        return self.defender