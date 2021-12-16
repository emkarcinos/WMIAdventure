from IngameUsers.businesslogic.experience.Experience import Experience
from IngameUsers.models import UserProfile
from IngameUsers.signals import user_should_gain_exp
from battle.businesslogic.Outcome import Outcome
from battle.businesslogic.exp_calculations import calculate_exp_gains


def _calculate_exp_gains_and_give_it_to_players(outcome: Outcome):
    """
    Calculates exp gain for each player and calls signals which give those exp gains to players.
    :param outcome: Battle outcome.
    :return: None
    """

    attacker_stats = UserProfile.objects.get(pk=outcome.attacker.id).user_stats
    defender_stats = UserProfile.objects.get(pk=outcome.defender.id).user_stats

    outcome.attacker_exp_gain, outcome.defender_exp_gain = calculate_exp_gains(
        outcome,
        Experience(attacker_stats.exp).level,
        Experience(defender_stats.exp).level,
    )

    user_should_gain_exp(attacker_stats, outcome.attacker_exp_gain)
    user_should_gain_exp(defender_stats, outcome.defender_exp_gain)


def on_battle_end(outcome: Outcome) -> None:
    """
    Handles all logic that should happen when battle ends.
    :param outcome: Battle outcome.
    :return: None
    """

    _calculate_exp_gains_and_give_it_to_players(outcome)
