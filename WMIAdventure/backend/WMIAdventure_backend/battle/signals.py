from IngameUsers.models import UserProfile
from IngameUsers.signals import user_should_gain_exp
from battle.businesslogic.Outcome import Outcome


def on_battle_end(outcome: Outcome):
    attacker_profile = UserProfile.objects.get(pk=outcome.attacker.id)
    defender_profile = UserProfile.objects.get(pk=outcome.defender.id)

    user_should_gain_exp(attacker_profile, outcome.attacker_exp_gain)
    user_should_gain_exp(defender_profile, outcome.defender_exp_gain)
