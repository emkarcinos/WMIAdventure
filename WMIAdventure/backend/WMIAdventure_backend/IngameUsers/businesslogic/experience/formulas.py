def level_to_exp(level):
    if level == 1:
        return 0
    elif level == 2:
        return 10
    elif level == 3:
        return 20
    elif 4 <= level <= 9:
        return level_to_exp(level - 1) + level_to_exp(level - 2)
    elif level >= 10:
        return ((level + 10) ** 2) * 10 - 3450
    return 0
