from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.ProcessRecorder import ProcessRecorder
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact
from battle.businesslogic.tests.Creator import Creator
from battle.businesslogic.tests.factories import create_battle_card
from cards.models import CardEffect


class ProcessRecorderTestCase(TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def setUp(self) -> None:
        self.recorder = ProcessRecorder(self.attacker, self.defender)

    def test_creation(self):
        self.assertIs(self.recorder.get_winner(), None)
        self.assertEqual(self.recorder.get_turns(), [])

        self.assertEquals(self.recorder.attacker.id, self.attacker.id)
        self.assertIsNotNone(self.recorder.defender.id, self.defender.id)

    def test_record_turn_start(self):
        """
        **Scenario:**

        - ProcessRecorder exists

        - Turn start is recorded

        - Turn start is recorded second time

        ---

        **Expected result:**

        - Proper Turn object is added to ProcessRecorder.turns

        - Second time AssertionError is raised, because we just recorded turn start.
        """

        current_player = self.attacker

        # Record turn
        turns_num_before_recording = len(self.recorder.turns)
        self.recorder.record_turn_start(self.attacker, self.defender, current_player)

        # Assert turn was recorded
        self.assertEquals(len(self.recorder.turns), turns_num_before_recording + 1)
        self.assertIs(self.recorder.current_turn, self.recorder.turns[-1])
        self.assertEquals(self.recorder.current_turn.card_executor_id, current_player.id)

        # Record turn second time - assert there is error
        self.assertRaises(
            AssertionError,
            self.recorder.record_turn_start, self.attacker, self.defender, current_player
        )

    def test_record_card_usage(self):
        """
        **Scenario:**

        - ProcessRecorder exists with recorded turn start

        - Card usage is recorded

        ---

        **Expected result:**

        - Card is recorded in current_turn
        """

        # Record turn start
        current_player = self.attacker
        self.recorder.record_turn_start(self.attacker, self.defender, current_player)

        # Record card usage
        card = create_battle_card()
        self.recorder.record_card_usage(card)

        # Assert card was recorded
        current_turn = self.recorder.current_turn
        self.assertIsNotNone(current_turn.used_card)
        self.assertEquals(current_turn.used_card.card_info_id, card.card_model.info.id)

    def test_record_effect_usage(self):
        """
        **Scenario:**

        - Process recorder exists

        - **A:** Effect usage is recorded

        - Process recorder records turn start

        - **B:** Effect usage is recorded

        - Process recorder records card usage

        - **C:** Effect usage is recorded

        ---

        **Expected result:**

        - **A:** AssertionError is raised, because turn start wasn't recorded

        - **B:** AssertionError is raised, because card usage wasn't recorded

        - **C:** Effect usage is recorded properly
        """

        target = self.defender
        used_effect = EffectImpact(CardEffect.EffectId.DMG, target.id)

        # Try to record effect usage without recording turn start
        self.assertRaises(
            AssertionError,
            self.recorder.record_effect_usage, used_effect
        )

        # Record turn start and try to record effect usage
        current_player = self.attacker
        self.recorder.record_turn_start(self.attacker, self.defender, current_player)
        self.assertRaises(
            AssertionError,
            self.recorder.record_effect_usage, used_effect
        )

        current_turn = self.recorder.current_turn

        # Record card usage and record effect usage
        card = create_battle_card()
        self.recorder.record_card_usage(card)

        used_effects_num_before_recording = len(current_turn.used_effects)
        self.recorder.record_effect_usage(used_effect)

        # Assert effect usage was recorded properly
        self.assertEquals(len(current_turn.used_effects), used_effects_num_before_recording + 1)
        recorded_usage = current_turn.used_effects[-1]
        self.assertIs(recorded_usage, used_effect)

    def test_record_turn_end(self):
        """
        **Scenario:**

        - Process recorded exists, nothing was recorded.

        - **A:** Record turn end.

        - Record turn start.

        - **B:** Record turn end.
        ---

        **Expected result:**

        - **A:** AssertionError is raised, because turn start wasn't recorded.

        - **B:** Turn end is recorded properly:
            - current_turn is None
        """

        # Try to record turn end
        self.assertRaises(
            AssertionError,
            self.recorder.record_turn_end
        )

        # Record turn start
        self.recorder.record_turn_start(self.attacker, self.defender, self.attacker)

        # Record turn end
        self.recorder.record_turn_end()

        # Assert turn end was recorded
        self.assertIsNone(self.recorder.current_turn)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
