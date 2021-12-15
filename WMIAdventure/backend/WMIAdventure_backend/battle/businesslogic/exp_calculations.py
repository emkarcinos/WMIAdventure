from math import sqrt

_c = 6


def win(winner_level, loser_level) -> int:
    """
    Calculates how much exp player should gain when he won battle.
    """

    return _c + round(sqrt(winner_level)) + loser_level


def draw(player_level, opponent_level) -> int:
    """
    Calculates how much exp player should gain in case of draw.
    """

    return int(sqrt(opponent_level))


def defeat(loser_level, winner_level) -> int:
    """
    Calculates how much exp should be gained by defeated player.
    """

    return 0
