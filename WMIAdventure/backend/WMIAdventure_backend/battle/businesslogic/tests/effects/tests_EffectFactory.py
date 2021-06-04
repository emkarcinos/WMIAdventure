from django.test import TestCase

from battle.businesslogic.effects.BlockCardEffect import BlockCardEffect
from battle.businesslogic.effects.DmgEffect import DmgEffect
from battle.businesslogic.effects.EffectFactory import EffectFactory
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
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects


class EffectFactoryTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    def setUp(self) -> None:
        self.instance = EffectFactory.get_instance()
        self.card = self.creator.get_cards()[0]


    def test_singleton(self):
        self.assertEqual(self.instance, EffectFactory.get_instance())

    def test_creation(self):
        deck = self.creator.get_attacker_deck()
        card_model = deck.card1.card
        effect = card_model.effects.all()[0]
        returned_effect = self.instance.create(effect)
        self.assertIs(returned_effect.effect_model, effect)

    def _create_effect_model(self, effect_id: CardEffect.EffectId):
        card_effect = CardEffect.objects.get(id=effect_id)
        effect_model = CardLevelEffects.objects.create(card=self.card, card_effect=card_effect)
        return effect_model

    def test_creation_concrete_effects(self):
        effect_id_expected_type_pairs = {
            CardEffect.EffectId.DMG: DmgEffect,
            CardEffect.EffectId.SHIELD: ShieldEffect,
            CardEffect.EffectId.SWAP_RND: RandomizeDeckEffect,
            CardEffect.EffectId.STOP: StopPlayerEffect,
            CardEffect.EffectId.DOUBLEACTION: TwoTimesExecuteEffect,
            CardEffect.EffectId.HEAL: HealEffect,
            CardEffect.EffectId.BLOCK: BlockCardEffect,
            CardEffect.EffectId.EMPOWER: EmpowerCardEffect,
            CardEffect.EffectId.SKIP: SkipCardEffect,
            CardEffect.EffectId.EMPOWER_DMG: EmpowerDamage,
            CardEffect.EffectId.EMPOWER_SHIELD: EmpowerShield,
            CardEffect.EffectId.EMPOWER_HEAL: EmpowerHeal,
            CardEffect.EffectId.TRUE_DMG: TrueDamageEffect,
        }

        for effect_id, expected_type in effect_id_expected_type_pairs.items():
            effect_model = self._create_effect_model(effect_id)
            actual_type = type(self.instance.create(effect_model))
            self.assertEqual(actual_type, expected_type)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
