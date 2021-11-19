from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class PlayerStoppedEffectImpact(EffectImpact):
    """
    Holds information about used effect, who was target for how many turns was stopped.
    """

    def __init__(self, effect_id: int, target_player_id: int, turns_stopped):
        super().__init__(effect_id, target_player_id)
        self.turns_stopped = turns_stopped
