from django.test import TestCase

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Buff import Buff
from battle.businesslogic.recorder.SimplifiedCard import SimplifiedCard
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects


class SimplifiedCardTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    def test_create1(self):
        """
        Scenario: Card has one DmgEffect and no buffs.
        Expected scenario: Created SimplifiedCard has correct fields.
        """

        expected_effects_ids = [CardEffect.EffectId.DMG]

        # Create data
        effects_data = [(expected_effects_ids[0], CardLevelEffects.Target.OPPONENT, 10, 5)]
        card_model = self.creator.create_card_model(effects_data, "name")
        card = BattleCard(card_model)
        simplified_card = SimplifiedCard(card)

        # Assert card_id
        expected_card_id = card.card_model.id
        actual_card_id = simplified_card.card_id

        self.assertEqual(actual_card_id, expected_card_id)

        # Assert effects_ids
        actual_effects_ids = simplified_card.effects_ids

        for actual_effect_id, expected_card_id in zip(actual_effects_ids, expected_effects_ids):
            self.assertEqual(actual_effect_id, expected_card_id)

        # Assert has_buffs
        self.assertFalse(simplified_card.has_buffs)

    def test_create2(self):
        """
        Scenario: Card has two effects DmgEffect, TwoTimesExecuteEffect and two buffs on DmgEffect.
        Buffs are:
            - Modifier +20
            - Modifier +10
        Expected result: Created SimplifiedCard has correct fields.
        """

        expected_effects_ids = [CardEffect.EffectId.DMG, CardEffect.EffectId.DOUBLEACTION]

        # Create data
        effects_data = [
            (expected_effects_ids[0], CardLevelEffects.Target.OPPONENT, 10, 5),
            (expected_effects_ids[1], CardLevelEffects.Target.OPPONENT, None, None)
        ]
        card_model = self.creator.create_card_model(effects_data, "name")
        card = BattleCard(card_model)
        dmg_effect_buffs = [Buff(modifier=20.0), Buff(modifier=10.0)]
        card.effects[0].buffs += dmg_effect_buffs

        simplified_card = SimplifiedCard(card)

        # Assert card_id
        expected_card_id = card.card_model.id
        actual_card_id = simplified_card.card_id

        self.assertEqual(actual_card_id, expected_card_id)

        # Assert effects_ids
        actual_effects_ids = simplified_card.effects_ids

        for actual_effect_id, expected_card_id in zip(actual_effects_ids, expected_effects_ids):
            self.assertEqual(actual_effect_id, expected_card_id)

        # Assert has_buffs
        self.assertTrue(simplified_card.has_buffs)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
