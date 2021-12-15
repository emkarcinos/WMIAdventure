from dataclasses import dataclass

from IngameUsers.businesslogic.experience.CachedLevelBoundaries import CachedLevelBoundaries


@dataclass(init=False)
class Experience:
    """
    Dataclass used to hold and transform player's experience into a level.
    Hold experience, current level and experience needed for the next level
    """

    def __init__(self, exp=0):
        self.level = 0
        self.exp_required_to_level_up = 0
        self.exp = exp
        self._populate()

    def _populate(self):
        guessing_level = 1
        # Could be an infinite loop, but let's make a failsafe stop condition here
        while guessing_level < 200:
            next_level_exp = CachedLevelBoundaries.get_min_exp_for_level(guessing_level)
            if self.exp < next_level_exp:
                self.level = guessing_level
                self.exp_required_to_level_up = next_level_exp - self.exp
                return

            guessing_level += 1
