from unittest.mock import patch

from django.test import TestCase

from .factories import create_player_with_deck
from ..Outcome import Outcome


class OutcomeTestCase(TestCase):
    def setUp(self) -> None:
        self.attacker, _ = create_player_with_deck()
        self.defender, _ = create_player_with_deck()
        self.outcome = Outcome(self.attacker, self.defender)

    def test_creation(self):
        expected_attacker = self.attacker
        expected_defender = self.defender

        self.assertFalse(self.outcome.is_completed)
        self.assertIs(self.outcome.attacker, expected_attacker)
        self.assertIs(self.outcome.defender, expected_defender)

    def test_is_done_after_creation(self):
        self.assertFalse(self.outcome.is_done(turn_num=0))

    def test_get_winner_after_creation(self):
        expected_outcome = None

        self.assertEqual(self.outcome.get_winner(), expected_outcome)

    @patch('battle.businesslogic.Outcome.defeat')
    @patch('battle.businesslogic.Outcome.win')
    def test_get_winner1(
            self,
            mock_win,
            mock_defeat
    ):
        """
        Scenario: Defender is defeated.
        Expected result: Attacker is winner.
        """

        self.outcome.defender.statistics.hp = 0.0

        expected_attacker_exp_gain = 5
        expected_defender_exp_gain = 0

        mock_win.return_value = expected_attacker_exp_gain
        mock_defeat.return_value = expected_defender_exp_gain

        self.outcome.is_done(turn_num=1)

        # Assert appropriate calculations were called
        mock_win.assert_called_once_with(
            self.attacker.level, self.defender.level
        )
        mock_defeat.assert_called_once_with(
            self.attacker.level, self.defender.level
        )

        self.assertIs(self.outcome.get_winner(), self.attacker)
        self.assertEquals(self.outcome.attacker_exp_gain, expected_attacker_exp_gain)
        self.assertEquals(self.outcome.defender_exp_gain, expected_defender_exp_gain)

        # Restoring defender hp
        self.outcome.defender.statistics.hp = self.outcome.defender.statistics.MAX_HP

    def test_get_winner2(self):
        """
        Scenario: Attacker is defeated.
        Expected result: Defender is winner.
        """

        self.outcome.attacker.statistics.hp = 0.0
        self.outcome.is_done(turn_num=1)
        self.assertIs(self.outcome.get_winner(), self.defender)

        # Restoring attacker hp
        self.outcome.attacker.statistics.hp = self.outcome.attacker.statistics.MAX_HP

    @patch('battle.businesslogic.Outcome.draw')
    def test_get_winner3(self, mock_draw):
        """
        Scenario: Attacker and defender are defeated.
        Expected result: None is winner.
        """

        self.outcome.attacker.statistics.hp = 0.0
        self.outcome.defender.statistics.hp = 0.0

        self.outcome.is_done(turn_num=1)
        self.assertEquals(mock_draw.call_count, 2)

        self.assertIsNone(self.outcome.get_winner())

        # Restoring players hp
        self.outcome.attacker.statistics.hp = self.outcome.attacker.statistics.MAX_HP
        self.outcome.defender.statistics.hp = self.outcome.defender.statistics.MAX_HP

    def test_is_done1(self):
        """
        Scenario: Maximum amount of turns = x, actual turn number = x + 1.
        Both of players have hp > 0.
        Expected result: Battle Outcome is completed and there is draw - winner is None.
        """

        # Assert both players have hp > 0
        self.assertGreater(self.outcome.attacker.get_hp(), 0)
        self.assertGreater(self.outcome.defender.get_hp(), 0)

        # Check if battle Outcome is done
        turn_number = self.outcome.MAX_TURNS + 1
        self.outcome.is_done(turn_number)

        # Assert battle Outcome is completed
        self.assertTrue(self.outcome.is_completed)

        # Assert there is draw - winner is None
        self.assertIsNone(self.outcome.get_winner())

