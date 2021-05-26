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

        self.cards_queue.append(BattleCard(deck_model.card1.card))
        self.cards_queue.append(BattleCard(deck_model.card2.card))
        self.cards_queue.append(BattleCard(deck_model.card3.card))
        self.cards_queue.append(BattleCard(deck_model.card4.card))
        self.cards_queue.append(BattleCard(deck_model.card5.card))

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
        if index < 0 or index > (len(self.cards_queue) - 1):
            raise IndexError(f"Card index out of bounds. Deck ranges from 0 to {len(self.cards_queue) - 1}."
                             f"You specified {index}")
        return self.cards_queue[index]

