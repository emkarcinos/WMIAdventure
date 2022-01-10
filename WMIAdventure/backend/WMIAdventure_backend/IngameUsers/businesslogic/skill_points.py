_SKILL_POINTS_PER_LEVEL = 10


def get_skill_points_per_level():
    return _SKILL_POINTS_PER_LEVEL


def calculate_skill_points_gain(level_before: int, level_after: int) -> int:
    """
    Calculates how many skill points user should gain for achieving some level.

    :param level_before: Level before exp gain.
    :param level_after: Level after exp gain.
    :return: Amount of skill points that should be given to user.
    """

    skill_points_gain = 0
    if level_after > level_before:
        skill_points_gain += (level_after - level_before) * _SKILL_POINTS_PER_LEVEL

    return skill_points_gain
