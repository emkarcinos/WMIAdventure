from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.Turn import Turn
from battle.businesslogic.tests.Creator import Creator


class TurnTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def test_creation(self):
        turn = Turn(attacker=self.attacker,
                    defender=self.defender, card_executor=self.attacker)
        self.assertEquals(turn.get_attacker().id, self.attacker.id)
        self.assertEquals(turn.get_defender().id, self.defender.id)
        self.assertEquals(turn.card_executor_id, self.attacker.id)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
