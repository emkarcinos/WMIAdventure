from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.Turn import Turn
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact
from battle.businesslogic.tests.Creator import Creator
from battle.businesslogic.tests.factories import create_battle_card
from cards.models import CardEffect


class TurnTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def setUp(self) -> None:
        self.card_executor = self.attacker
        self.turn = Turn(attacker=self.attacker, defender=self.defender,
                         card_executor=self.card_executor)

    def test_creation(self):
        self.assertEquals(self.turn.get_attacker().id, self.attacker.id)
        self.assertEquals(self.turn.get_defender().id, self.defender.id)
        self.assertEquals(self.turn.card_executor_id, self.attacker.id)
        self.assertIsNone(self.turn.used_card)
        self.assertEquals(len(self.turn.used_effects), 0)

    def test_record_card_usage(self):
        """
        **Scenario:**

        - Turn exists

        - Card usage is recorded

        ---

        **Expected result:**

        - Turn contains recorded card with proper data.
        """

        # Create some card
        card = create_battle_card()

        # Record card usage
        self.turn.record_card_usage(card)

        # Assert card was recorded
        self.assertIsNotNone(self.turn.used_card)
        self.assertEquals(self.turn.used_card.card_info_id, card.card_model.info.id)

    def test_record_effect_usage(self):
        """
        **Scenario:**

        - Turn exists.

        - Effect usage is recorded

        - Card usage is recorded.

        - Effect usage is recorded.

        ---

        **Expected result:**

        - First time when trying to record effect usage AssertionError is raised, because there was no card usage recorded.

        - Second time effect usage is recorded properly.
        """

        # Create some EffectImpact
        used_effect = EffectImpact(CardEffect.EffectId.DMG, self.attacker.id)

        # Record effect usage without recording card usage
        effects_num_before_recording = len(self.turn.used_effects)
        self.assertRaises(
            AssertionError,
            self.turn.record_effect_usage, used_effect
        )

        # Record card usage
        card = create_battle_card()
        self.turn.record_card_usage(card)

        # Record effect usage
        self.turn.record_effect_usage(used_effect)

        # Assert effect was recorded
        self.assertEquals(len(self.turn.used_effects), effects_num_before_recording + 1)
        self.assertEquals(self.turn.used_effects[-1].id, used_effect.id)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
