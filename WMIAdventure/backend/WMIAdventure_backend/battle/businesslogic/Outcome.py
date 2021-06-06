from .Player import Player


class Outcome:
    """
    Validates the outcome of the battle.
    """

    def __init__(self, attacker: Player, defender: Player):
        self.is_completed = False
        self.attacker = attacker
        self.defender = defender

    def is_done(self) -> bool:
        """
        Checks whether the battle has completed.
        """
        if self.attacker.get_hp() <= 0.0 or self.defender.get_hp() <= 0.0:
            self.is_completed = True

        return self.is_completed

    def get_winner(self) -> Player or None:
        """
        Get the winner.
        If the is_done method wasn't called and the battle hasn't ended before calling this function, it will return None.
        """
        if not self.is_completed:
            return None

        winner = None
        if self.attacker.get_hp() <= 0.0 and self.defender.get_hp() <= 0.0:  # Both players are defeated - draw
            winner = None
        elif self.attacker.get_hp() <= 0.0:  # Attacker is defeated - defender wins
            winner = self.defender
        elif self.defender.get_hp() <= 0.0:  # Defender is defeated - attacker wins
            winner = self.attacker

        return winner
