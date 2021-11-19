from django.test import TestCase

from battle.businesslogic.recorder.SimplifiedDeck import SimplifiedDeck
from battle.businesslogic.tests.factories import create_player_with_deck


class SimplifiedDeckTestCase(TestCase):
    def test_creation(self):
        """
        **Scenario:**

        - Deck exists.

        - SimplifiedDeck is created out of this Deck.

        ---

        **Expected result:**

        - SimplifiedDeck contains cards in proper order.
        """

        _, deck = create_player_with_deck()

        # Create SimplifiedDeck
        simplified_deck = SimplifiedDeck(deck)

        # Assert SimplifiedDeck is in proper order with proper data
        for i in range(deck.size()):
            # Card from Deck
            card_from_deck = deck.lookup(i)
            expected_card_info_id = card_from_deck.card_model.info.id
            expected_level = card_from_deck.card_model.level.level

            # Card from SimplifiedDeck
            card_from_simplified_deck = simplified_deck.cards[i]
            actual_level = card_from_simplified_deck.level
            actual_card_info_id = card_from_simplified_deck.card_info_id

            # Assert card data is valid
            self.assertEquals(actual_card_info_id, expected_card_info_id)
            self.assertEquals(actual_level, expected_level)
