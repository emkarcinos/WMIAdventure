from .Player import Player
from .exp_calculations import win, defeat, draw


class Outcome:
    """
    Validates the outcome of the battle.
    """

    """
    Maximum number of turns for battle (without it there could be case, where battle would never stop)
    """
    MAX_TURNS: int = 100

    def __init__(self, attacker: Player, defender: Player):
        self.is_completed = False
        self.attacker = attacker
        self.defender = defender
        self.attacker_exp_gain = 0
        self.defender_exp_gain = 0

    def is_done(self, turn_num: int) -> bool:
        """
        Checks whether the battle has completed.
        Battle can be completed if:

        - one of the players are defeated
        - maximum number of turns have passed

        :param turn_num: Current turn number.
        :return: If battle is completed.
        """

        if self.is_completed:
            return self.is_completed

        if self.attacker.get_hp() <= 0.0 or self.defender.get_hp() <= 0.0 or turn_num > self.MAX_TURNS:
            self.is_completed = True
            self._calculate_exp_gain()

        return self.is_completed

    def _calculate_exp_gain(self):
        """
        When battle is finished this method is called to calculate exp
        gain for each player.
        """

        winner = self.get_winner()

        if winner is None:
            self.attacker_exp_gain = draw(self.attacker.level, self.defender.level)
            self.defender_exp_gain = draw(self.defender.level, self.attacker.level)
        elif winner is self.attacker:
            self.attacker_exp_gain = win(self.attacker.level, self.defender.level)
            self.defender_exp_gain = defeat(self.defender.level, self.attacker.level)
        elif winner is self.defender:
            self.attacker_exp_gain = defeat(self.attacker.level, self.defender.level)
            self.defender_exp_gain = win(self.defender.level, self.attacker.level)

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
