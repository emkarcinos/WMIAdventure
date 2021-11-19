from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class CardBlockedEffectImpact(EffectImpact):
    """
    Holds information about used effect, whose card was blocked and for how many turns was blocked.
    """

    def __init__(self, effect_id: int, target_player_id: int, turns_blocked: int, blocked_card):
        super().__init__(effect_id, target_player_id)

        self.turns_blocked = turns_blocked
        self.blocked_card = blocked_card
