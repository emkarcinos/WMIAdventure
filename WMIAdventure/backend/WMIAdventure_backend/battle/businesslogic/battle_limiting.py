from dataclasses import dataclass
from typing import Optional
from django.utils import timezone

_BATTLE_LIMIT_DURATION = timezone.timedelta(hours=1)
_MAX_FIGHTS = 20
_TIME_BETWEEN_DATA_CLEARING = timezone.timedelta(minutes=15)


def get_battle_limit_duration():
    return _BATTLE_LIMIT_DURATION


def get_max_fights():
    return _MAX_FIGHTS


def get_time_between_data_clearing():
    return _TIME_BETWEEN_DATA_CLEARING


@dataclass
class UserFights:
    fights_count: int
    battle_limit_reset_date: timezone.datetime


_recent_fights: dict[int, UserFights] = {}
"""
Stores records of player's battle count and when this counter will be reset.
"""

_last_clear_time = timezone.now()


def should_remove_redundant_data() -> tuple[bool, int]:
    """
    Removes redundant data if needed to prevent memory leak.

    :returns: (True, removed_records_count) or (False, 0).
    """

    global _last_clear_time
    now = timezone.now()

    if now > _last_clear_time + _TIME_BETWEEN_DATA_CLEARING:
        removed_records_count = _remove_redundant_data(now)
        _last_clear_time = now
        return True, removed_records_count

    return False, 0


def clear_records():
    _recent_fights.clear()


def can_user_fight(user_id) -> bool:
    """
    Checks if user can fight and updates appropriate records.
    """
    should_remove_redundant_data()
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


def when_will_fight_limit_reset(user_id) -> Optional[timezone.timedelta]:
    """
    :returns: None if currently there is no limit for given user, timedelta otherwise.
    """

    now = timezone.now()
    user_fights = _recent_fights.get(user_id, None)
    if user_fights is None:
        return None

    if now < user_fights.battle_limit_reset_date:
        return user_fights.battle_limit_reset_date - now


def get_user_fights_record(user_id):
    return _recent_fights.get(user_id, None)


def _remove_redundant_data(now: timezone.datetime):
    """
    Iterates over all records and removes redundant ones.

    Record is redundant if it's battle limit reset date has passed - there is no need to store it.

    :returns: Number of removed records.
    """

    users_to_remove = []
    count = 0

    for user_id, record in _recent_fights.items():
        if now > record.battle_limit_reset_date:
            users_to_remove.append(user_id)
            count += 1

    for user_id in users_to_remove:
        _recent_fights.pop(user_id)

    return count
