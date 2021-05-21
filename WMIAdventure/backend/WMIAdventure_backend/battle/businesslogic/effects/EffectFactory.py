from battle.businesslogic.effects.Effect import Effect
from cards.models import CardLevelEffects


class EffectFactory:
    instance = None

    @staticmethod
    def get_instance():
        if EffectFactory.instance is None:
            EffectFactory.instance = EffectFactory()
        return EffectFactory.instance

    def create(self, effect_model: CardLevelEffects):
        """
        Creates concrete effect class deriving from BattleEffect abstract class.
        @param effect_model: Database model of card effect.
        @return: Instance of class deriving from BattleEffect.
        """

        # TODO: Implement creation of classes deriving from BattleCardEffect abstract class.
        return Effect(effect_model)
