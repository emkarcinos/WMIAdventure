from django.test import TestCase

from battle.businesslogic.Coordinator import Coordinator
from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.tests.Creator import Creator


class CoordinatorTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        cls.profiles = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(cls.profiles[0])
        cls.defender = PlayerFactory.get_instance().create(cls.profiles[1])
        cls.coordinator = Coordinator(cls.attacker, cls.defender)

    def test_next_turn(self):
        self.coordinator.next_turn()

    def test_opponent(self):
        attacker = self.coordinator.attacker
        defender = self.coordinator.defender

        self.assertEqual(attacker, self.coordinator.get_players_opponent(defender))

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
