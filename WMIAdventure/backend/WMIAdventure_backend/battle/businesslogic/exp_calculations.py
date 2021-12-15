from math import sqrt

from battle.businesslogic.Outcome import Outcome

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


def calculate_exp_gains(outcome: Outcome, attacker_level: int, defender_level: int) -> tuple[int, int]:
    """
    When battle is finished this method is called to calculate exp
    gain for each player.

    :param outcome: Exp gains will be calculated based on battle outcome.
    :param attacker_level:
    :param defender_level:
    :return: attacker_exp_gain, defender_exp_gain
    """

    attacker_exp_gain = 0
    defender_exp_gain = 0

    winner = outcome.get_winner()

    if winner is None:
        attacker_exp_gain = draw(attacker_level, attacker_level)
        defender_exp_gain = draw(defender_level, attacker_level)
    elif winner is outcome.attacker:
        attacker_exp_gain = win(attacker_level, attacker_level)
        defender_exp_gain = defeat(defender_level, attacker_level)
    elif winner is outcome.defender:
        attacker_exp_gain = defeat(attacker_level, attacker_level)
        defender_exp_gain = win(defender_level, attacker_level)

    return attacker_exp_gain, defender_exp_gain
