from django.utils import timezone
from dataclasses import dataclass

_BATTLE_LIMIT_DURATION = timezone.timedelta(hours=1)
def get_battle_limit_duration():
    return _BATTLE_LIMIT_DURATION

_MAX_FIGHTS = 20
def get_max_fights():
    return _MAX_FIGHTS

@dataclass
class UserFights:
    fights_count: int
    battle_limit_reset_date: timezone.datetime

_recent_fights: dict[int, UserFights] = {}
"""
Stores records of player's battle count and when this counter will be reset.
"""
def clear_records():
    _recent_fights.clear()

def can_user_fight(user_id) -> bool:
    """
    Checks if user can fight and updates appropriate records.
    """

    now = timezone.now()

    user_fights = _recent_fights.get(user_id, None)

    if user_fights:
        # If battle limit duration passed - reset timer and record one fight
        if now > user_fights.battle_limit_reset_date:
            user_fights.battle_limit_reset_date = now + _BATTLE_LIMIT_DURATION
            user_fights.fights_count = 1
        # If limit duration is live, but user did not exceed fights limit - add one fight to counter
        elif user_fights.fights_count < _MAX_FIGHTS:
            user_fights.fights_count += 1
        # If limit duration is live and user exceeded fights limit - user can't fight
        else:
            return False
    elif user_fights is None:
        user_fights = UserFights(1, now + _BATTLE_LIMIT_DURATION)

    _recent_fights[user_id] = user_fights
    return True

def when_will_fight_limit_reset(user_id) -> timezone.timedelta:
    """
    :returns: None if currently there is no limit for given user, timedelta otherwise.
    """

    now = timezone.now()

    user_fights = _recent_fights.get(user_id, None)

    if user_fights and now < user_fights.battle_limit_reset_date:
        return user_fights.battle_limit_reset_date - now

    return None


def get_user_fights_record(user_id):
    return _recent_fights.get(user_id, None)
