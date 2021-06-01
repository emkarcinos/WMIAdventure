from battle.businesslogic.effects.BlockCardEffect import BlockCardEffect
from battle.businesslogic.effects.DmgEffect import DmgEffect
from battle.businesslogic.effects.EmpowerCardEffect import EmpowerCardEffect
from battle.businesslogic.effects.EmpowerDamage import EmpowerDamage
from battle.businesslogic.effects.EmpowerHeal import EmpowerHeal
from battle.businesslogic.effects.EmpowerShield import EmpowerShield
from battle.businesslogic.effects.HealEffect import HealEffect
from battle.businesslogic.effects.RandomizeDeckEffect import RandomizeDeckEffect
from battle.businesslogic.effects.ShieldEffect import ShieldEffect
from battle.businesslogic.effects.SkipCardEffect import SkipCardEffect
from battle.businesslogic.effects.StopPlayerEffect import StopPlayerEffect
from battle.businesslogic.effects.TrueDamageEffect import TrueDamageEffect
from battle.businesslogic.effects.TwoTimesExecuteEffect import TwoTimesExecuteEffect
from cards.models import CardLevelEffects, CardEffect


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
        switch = \
            {
                CardEffect.EffectId.DMG: DmgEffect(effect_model),
                CardEffect.EffectId.SHIELD: ShieldEffect(effect_model),
                CardEffect.EffectId.HEAL: HealEffect(effect_model),
                CardEffect.EffectId.EMPOWER: EmpowerCardEffect(effect_model),
                CardEffect.EffectId.EMPOWER_DMG: EmpowerDamage(effect_model),
                CardEffect.EffectId.EMPOWER_HEAL: EmpowerHeal(effect_model),
                CardEffect.EffectId.EMPOWER_SHIELD: EmpowerShield(effect_model),
                CardEffect.EffectId.SKIP: SkipCardEffect(effect_model),
                CardEffect.EffectId.SWAP_RND: RandomizeDeckEffect(effect_model),
                CardEffect.EffectId.DOUBLEACTION: TwoTimesExecuteEffect(effect_model),
                CardEffect.EffectId.TRUE_DMG: TrueDamageEffect(effect_model),
                CardEffect.EffectId.STOP: StopPlayerEffect(effect_model),
                CardEffect.EffectId.BLOCK: BlockCardEffect(effect_model)
            }

        requested_effect = CardEffect.EffectId(effect_model.card_effect.id)
        return switch.get(requested_effect, None)
