from unittest import TestCase

from battle.businesslogic.battle_recording.BattleTurn import BattleTurn
from battle.businesslogic.battle_recording.PlayersChanges import PlayersChanges


class BattleTurnTestCase(TestCase):
    def test_create(self):
        expected_card_executor_id = 1
        expected_used_card_number = 1
        expected_players_changes = PlayersChanges(None, None)

        actual_battle_turn = BattleTurn(expected_card_executor_id,
                                        expected_used_card_number,
                                        expected_players_changes)

        self.assertEqual(actual_battle_turn.card_executor_id, expected_card_executor_id)
        self.assertEqual(actual_battle_turn.used_card_number, expected_used_card_number)
        self.assertIs(actual_battle_turn.players_changes, expected_players_changes)
