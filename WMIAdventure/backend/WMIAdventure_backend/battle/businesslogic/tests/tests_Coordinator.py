from django.test import TestCase

from battle.businesslogic.Coordinator import Coordinator
from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.ProcessRecorder import ProcessRecorder
from battle.businesslogic.tests.Creator import Creator


class CoordinatorTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        cls.profiles = cls.creator.get_user_profile_models()

    def setUp(self) -> None:
        self.attacker = PlayerFactory.get_instance().create(self.profiles[0])
        self.defender = PlayerFactory.get_instance().create(self.profiles[1])

        self.coordinator = Coordinator(self.attacker, self.defender)

    def test_next_turn(self):
        """
        **Scenario:**

        - Coordinator and ProcessRecorder exist.

        - Next turn is performed.

        ---

        **Expected result:**

        - Player that was at the front of TurnsQueue now is placed the end.

        - Turn is recorded in ProcessRecorder.
        """

        recorder = ProcessRecorder(self.attacker, self.defender)

        # Player that is currently at the front of TurnsQueue
        old_front_player = self.coordinator.turnsQueue.queue[0]

        # Save states before performing next turn
        turns_num_before_next_turn = len(recorder.turns)

        # Perform next turn
        self.coordinator.next_turn(recorder)

        # Assert player that was at the front of TurnsQueue is now at the back
        new_front_player = self.coordinator.turnsQueue.queue[0]
        self.assertIsNot(new_front_player, old_front_player)
        self.assertIs(self.coordinator.turnsQueue.queue[-1], old_front_player)

        # Assert Turn was recorded in ProcessRecorder
        self.assertEquals(len(recorder.turns), turns_num_before_next_turn + 1)
        recorded_turn = recorder.turns[-1]

        self.assertEquals(recorded_turn.card_executor_id, old_front_player.id)

    def test_opponent(self):
        attacker = self.coordinator.attacker
        defender = self.coordinator.defender

        self.assertEqual(attacker, self.coordinator.get_players_opponent(defender))

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
