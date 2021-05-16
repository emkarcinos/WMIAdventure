from unittest import TestCase

from .Creator import Creator
from ..Battle import Battle


class BattleTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile_model1, cls.user_profile_model2 = cls.creator.get_user_profile_models()

    def test_creation(self):
        battle = Battle(self.user_profile_model1, self.user_profile_model2)

        self.assertIsNotNone(battle.coordinator)
        self.assertIsNotNone(battle.outcome)
        self.assertFalse(battle.outcome.get_outcome())

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()