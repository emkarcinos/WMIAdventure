from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class CardBuffedEffectImpact(EffectImpact):
    """
    Holds information about used effect, whose card was buffed.

    Also stores info about applied buff and which card was buffed.
    """

    def __init__(self, effect_id: int, target_player_id: int, buff, buffed_card):
        super().__init__(effect_id, target_player_id)

        self.buff = buff
        self.buffed_card = buffed_card
