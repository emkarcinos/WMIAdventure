from unittest import TestCase
from unittest.mock import patch, MagicMock

from IngameUsers.factories import create_user_profile_with_deck
from ..Battle import Battle


class BattleTestCase(TestCase):

    def setUp(self) -> None:
        self.user_profile_model1 = create_user_profile_with_deck()[0]
        self.user_profile_model2 = create_user_profile_with_deck()[0]

    def test_creation(self):
        battle = Battle(self.user_profile_model1, self.user_profile_model2)

        self.assertIsNotNone(battle.coordinator)
        self.assertIsNotNone(battle.recorder)
        self.assertIsNotNone(battle.outcome)
        self.assertEquals(battle.turns_count, 0)
        self.assertIsNone(battle.outcome.get_winner())

    def test_recorder_integration(self):
        battle = Battle(self.user_profile_model1, self.user_profile_model2)
        battle.turn()
        battle.turn()

        self.assertGreater(len(battle.recorder.turns), 1)

    @patch('battle.businesslogic.Battle.on_battle_end')
    def test_start(self, mock_on_battle_end: MagicMock):
        battle = Battle(self.user_profile_model1, self.user_profile_model2)
        battle.start()

        mock_on_battle_end.assert_called_once_with(battle.outcome)
