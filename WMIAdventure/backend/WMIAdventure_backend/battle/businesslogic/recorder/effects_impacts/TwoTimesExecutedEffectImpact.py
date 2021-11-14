from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class TwoTimesExecutedEffectImpact(EffectImpact):
    """
    Holds information about used effect, whose card was doubled.
    """

    def __init__(self, effect_id: int, target_player_id: int, doubled_card):
        super().__init__(effect_id, target_player_id)

        self.doubled_card = doubled_card
