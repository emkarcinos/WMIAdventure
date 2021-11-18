from copy import copy

from battle.businesslogic.Statistics import Statistics
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class StatsChangedEffectImpact(EffectImpact):
    """
    Holds information about used effect, who was target
    and stores target's statistics that have been changed by activation of this effect.
    """

    def __init__(self, effect_id: int, calculated_power: float, target_player_id: int,
                 changed_stats: Statistics):
        super().__init__(effect_id, target_player_id)
        self.power = calculated_power
        self.changed_stats = copy(changed_stats)
