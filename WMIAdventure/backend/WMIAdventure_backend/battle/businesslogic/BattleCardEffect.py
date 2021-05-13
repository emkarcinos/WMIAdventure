from WMIAdventure_backend.cards.models import CardLevelEffects


class BattleCardEffect:
    def __init__(self, effect_model: CardLevelEffects):
        """
        Creates BattleCardEffect instance.
        @param effect_model: Database model.
        """

        self.target = effect_model.target
        self.power = effect_model.power
        self.range = effect_model.range
