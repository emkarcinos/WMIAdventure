from django.test import TestCase

from battle.businesslogic.exp_calculations import win, draw, defeat


class CalculationsTestCase(TestCase):
    def test_win_and_defeat(self):
        winner_level = 5
        loser_level = 17
        expected_winner_gain = 35
        expected_loser_gain = 0

        actual_winner_gain = win(winner_level, loser_level)
        actual_loser_gain = defeat(loser_level, winner_level)

        self.assertEquals(actual_winner_gain, expected_winner_gain)
        self.assertEquals(actual_loser_gain, expected_loser_gain)

    def test_win_and_defeat2(self):
        """Attacker with big level wins with player with small level"""

        winner_level = 20
        loser_level = 2
        expected_winner_gain = 1
        expected_loser_gain = 0

        actual_winner_gain = win(winner_level, loser_level)
        actual_loser_gain = defeat(loser_level, winner_level)

        self.assertEquals(actual_winner_gain, expected_winner_gain)
        self.assertEquals(actual_loser_gain, expected_loser_gain)

    def test_draw(self):
        player1_level = 5
        player2_level = 17

        expected_player1_gain = 4
        expected_player2_gain = 2

        actual_player1_gain = draw(player1_level, player2_level)
        actual_player2_gain = draw(player2_level, player1_level)

        self.assertEquals(actual_player1_gain, expected_player1_gain)
        self.assertEquals(actual_player2_gain, expected_player2_gain)
