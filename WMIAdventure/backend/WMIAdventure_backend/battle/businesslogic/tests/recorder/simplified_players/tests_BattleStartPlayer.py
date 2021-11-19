from django.test import TestCase

from battle.businesslogic.recorder.simplified_players.BattleStartPlayer import BattleStartPlayer
from battle.businesslogic.tests.factories import create_player


class BattleStartPlayerTestCase(TestCase):
    def test_creation(self):
        """
        **Scenario:**

        - BattleStartPlayer is created from some Player

        **Expected result:**

        - BattleStartPlayer contains proper deck data in proper order.

        """

        player = create_player()
        battle_start_p = BattleStartPlayer(player)

        # Assert deck is proper size
        self.assertEquals(len(battle_start_p.deck.cards), player.deck.size())

        # Assert deck is in proper order
        for i in range(player.deck.size()):
            # Card from Player's deck
            card_from_p = player.deck.lookup(i)
            expected_card_info_id = card_from_p.card_model.info.id
            expected_level = card_from_p.card_model.level.level

            # Card from BattleStartPlayer's deck
            card_from_battle_start_p = battle_start_p.deck.cards[i]
            actual_level = card_from_battle_start_p.level
            actual_card_info_id = card_from_battle_start_p.card_info_id

            # Assert card data is valid
            self.assertEquals(actual_card_info_id, expected_card_info_id)
            self.assertEquals(actual_level, expected_level)
