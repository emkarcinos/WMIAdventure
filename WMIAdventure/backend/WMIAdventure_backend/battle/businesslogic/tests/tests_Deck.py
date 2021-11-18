from typing import List
from unittest import TestCase

from .Creator import Creator
from ..BattleCard import BattleCard
from ..Deck import Deck
from ..buffs.CardDuplicatedBuff import CardDuplicatedBuff


class DeckTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.attacker_deck, cls.defender_deck = cls.creator.get_decks(user=1)

    def setUp(self) -> None:
        self.attacker_battle_deck = Deck(self.attacker_deck)

    def test_card_order_during_creation(self):
        cards_list: List[BattleCard] = list(self.attacker_battle_deck.cards_queue)

        self.assertIs(cards_list[0].card_model, self.attacker_deck.card1.card)
        self.assertIs(cards_list[1].card_model, self.attacker_deck.card2.card)
        self.assertIs(cards_list[2].card_model, self.attacker_deck.card3.card)
        self.assertIs(cards_list[3].card_model, self.attacker_deck.card4.card)
        self.assertIs(cards_list[4].card_model, self.attacker_deck.card5.card)

    def test_lookup(self):
        card0 = self.attacker_battle_deck.cards_queue[0]
        card1 = self.attacker_battle_deck.cards_queue[1]

        self.assertIs(card0, self.attacker_battle_deck.lookup())
        self.assertIs(card1, self.attacker_battle_deck.lookup(index=1))

        # We poop a card from the deck and see if lookup returns the next element
        self.attacker_battle_deck.get_card()
        self.assertIs(card1, self.attacker_battle_deck.lookup())

    def test_lookup_throws(self):
        self.assertRaises(IndexError, self.attacker_battle_deck.lookup, index=-1)
        self.assertRaises(IndexError, self.attacker_battle_deck.lookup, index=5)

    def test_get_card(self):
        card = self.attacker_battle_deck.get_card()

        # Assert card is inserted at the back of the cards queue when you retrieve it.
        self.assertIs(card, list(self.attacker_battle_deck.cards_queue)[-1])

    def test_get_card_which_is_duplicated(self):
        """
        **Scenario:**

        - Deck exists, card at the front of Deck is doubled.

        - We get card from deck.

        ---

        **Expected result:**

        - Card which was at the front of the deck before we retrieved it is still there, because it was duplicated
        when we retrieved it.
        """

        deck = self.attacker_battle_deck

        # Make card at the front of the deck doubled
        card_at_front = deck.lookup()
        card_at_front.card_duplicated_buff = CardDuplicatedBuff(card_at_front.effects)

        # Get card from deck
        retrieved_card = deck.get_card()

        # Assert that retrieved card is still at the top of the deck
        self.assertIs(retrieved_card, deck.lookup())

    def test_size(self):
        deck = self.attacker_battle_deck
        expected_size = 5
        self.assertEqual(deck.size(), expected_size)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
