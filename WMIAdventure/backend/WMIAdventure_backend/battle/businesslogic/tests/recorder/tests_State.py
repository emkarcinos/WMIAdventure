from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.State import State
from battle.businesslogic.tests.Creator import Creator


class StateTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def test_creation(self):
        state = State(attacker=self.attacker,
                      defender=self.defender)
        self.assertIs(state.get_attacker(), self.attacker)
        self.assertIs(state.get_defender(), self.defender)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()