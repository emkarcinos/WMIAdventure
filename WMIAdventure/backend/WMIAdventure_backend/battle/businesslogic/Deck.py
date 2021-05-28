from collections import deque

from IngameUsers.models import Deck as DeckModel
from .BattleCard import BattleCard


class Deck:

    def __init__(self, deck_model: DeckModel):
        """
        Creates BattleDeck instance.
        @param deck_model: Deck database model.
        """

        self.cards_queue = deque()

        self.create_cards_queue((BattleCard(deck_model.card1.card), BattleCard(deck_model.card2.card),
                                 BattleCard(deck_model.card3.card), BattleCard(deck_model.card4.card),
                                 BattleCard(deck_model.card5.card)))

    def create_cards_queue(self, ordered_cards: tuple[BattleCard, BattleCard, BattleCard, BattleCard, BattleCard]):
        """
        Creates cards queue.
        @param ordered_cards: Cards in order in which queue will be created.
        @return: None
        """
        self.cards_queue.clear()

        for card in ordered_cards:
            self.cards_queue.append(card)

    def get_card(self) -> BattleCard:
        """
        Retrieves first card from queue and appends it at the end.
        @return: Card which should be used in battle in current turn.
        """

        card = self.cards_queue.popleft()
        self.cards_queue.append(card)
        return card

    def lookup(self, index=0) -> BattleCard:
        """
        Returns the card from the queue without modifying the deck.
        @param index - card position in deck
        """
        if index < 0 or index > (self.size() - 1):
            raise IndexError(f"Card index out of bounds. Deck ranges from 0 to {self.size() - 1}."
                             f"You specified {index}")
        return self.cards_queue[index]

    def size(self) -> int:
        """

        @return: How many cards are in deck.
        """

        return len(self.cards_queue)
