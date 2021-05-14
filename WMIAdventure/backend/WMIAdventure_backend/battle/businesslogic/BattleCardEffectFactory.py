from cards.models import CardLevelEffects
from .BattleCardEffect import BattleCardEffect


class BattleCardEffectsFactory:
    instance = None

    @staticmethod
    def get_instance():
        if BattleCardEffectsFactory.instance is None:
            BattleCardEffectsFactory.instance = BattleCardEffectsFactory()
        return BattleCardEffectsFactory.instance

    def create(self, effect_model: CardLevelEffects):
        """
        Creates concrete effect class deriving from BattleEffect abstract class.
        @param effect_model: Database model of card effect.
        @return: Instance of class deriving from BattleEffect.
        """

        # TODO: Implement creation of classes deriving from BattleCardEffect abstract class.
        return BattleCardEffect(effect_model)
