from IngameUsers.businesslogic.experience.formulas import level_to_exp


class CachedLevelBoundaries:
    """
    Caching class that tells you what experience is required for a specific level.
    This is cached at runtime using values calculated by exp formulas.
    """
    boundaries_cache = {}
    
    # injectable
    level_to_exp_func = level_to_exp

    @staticmethod
    def get_min_exp_for_level(level):
        value = CachedLevelBoundaries.boundaries_cache.get(level, None)
        if value is not None:
            return value

        exp = CachedLevelBoundaries.level_to_exp_func(level + 1)
        CachedLevelBoundaries.boundaries_cache[level] = exp

        return exp
