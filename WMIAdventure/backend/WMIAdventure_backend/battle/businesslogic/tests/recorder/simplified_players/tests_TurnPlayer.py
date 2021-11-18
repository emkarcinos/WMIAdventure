from django.test import TestCase

from battle.businesslogic.recorder.simplified_players.TurnPlayer import TurnPlayer
from battle.businesslogic.tests.factories import create_player


class TurnPlayerTestCase(TestCase):
    def test_creation(self):
        """
        **Scenario:**

        - TurnPlayer is created from some Player

        **Expected result:**

        - TurnPlayer contains proper deck data in proper order.

        """

        player = create_player()
        turn_player = TurnPlayer(player)

        # Assert deck is proper size
        self.assertEquals(len(turn_player.deck), player.deck.size())

        # Assert deck is in proper order
        for i in range(player.deck.size()):
            card_from_player_deck = player.deck.lookup(i)
            expected_id = card_from_player_deck.card_model.info.id
            actual_id = turn_player.deck[i]

            self.assertEquals(actual_id, expected_id)
