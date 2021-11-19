class EffectImpact:
    """
    Abstract class - should be implemented by some concrete classes.

    Holds information about used effect, who was target and what changes activation of this effect caused.
    """

    def __init__(self, effect_id: int, target_player_id: int):
        self.id = effect_id
        self.target_player = target_player_id

    def __str__(self):
        return f"EffectImpact id: {self.id} target: {self.target_player}"
