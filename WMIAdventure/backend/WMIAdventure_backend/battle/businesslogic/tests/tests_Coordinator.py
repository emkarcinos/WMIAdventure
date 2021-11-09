from django.test import TestCase

from battle.businesslogic.Coordinator import Coordinator
from battle.businesslogic.PlayerFactory import PlayerFactory
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
        # TODO: update this test
        self.skipTest("This test no longer works, because now ProcessRecorder is being injected to this method.")
        self.coordinator.next_turn()

    def test_opponent(self):
        attacker = self.coordinator.attacker
        defender = self.coordinator.defender

        self.assertEqual(attacker, self.coordinator.get_players_opponent(defender))

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
