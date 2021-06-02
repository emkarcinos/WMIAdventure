from collections import deque
from typing import Union

from IngameUsers.models import Deck as DeckModel
from .BattleCard import BattleCard


class Deck:

    def __init__(self, deck_model: DeckModel):
        """
        Creates BattleDeck instance.
        @param deck_model: Deck database model.
        """

        self.cards_queue = deque()
        # This queue actually takes priority over cards_queue - it needs to be emptied before the actual cards_queue
        # can kick in.
        # Its use is to keep track of any cards that may execute multiple times without disrupting the deck.
        self.temp_cards_queue = deque()

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

    def _get_card_from_temp_queue(self, lookup_only=False) -> Union[BattleCard, None]:
        """
        Returns a card from temp queue. If there are no cards there, returns none.
        @param lookup_only: If set to true, the method won't pop the element from the queue.
        """
        if len(self.temp_cards_queue) == 0:
            return None

        if lookup_only:
            return self.temp_cards_queue[0]

        return self.temp_cards_queue.popleft()

    def _dequeue_card(self) -> BattleCard:
        """
        Dequeues the card, enqueues it to the back of the queue and returns it for you.
        """
        card = self.cards_queue.popleft()
        self.cards_queue.append(card)
        return card

    def get_card(self) -> BattleCard:
        """
        Retrieves first card from queue and appends it at the end.
        @return: Card which should be used in battle in current turn.
        """
        card = self._get_card_from_temp_queue()

        if card is None:
            card = self._dequeue_card()

        return card

    def lookup(self, index=0) -> BattleCard:
        """
        Returns the card from the queue without modifying the deck.
        @param index - card position in deck
        """
        if index < 0 or index > (self.size() - 1):
            raise IndexError(f"Card index out of bounds. Deck ranges from 0 to {self.size() - 1}."
                             f"You specified {index}")

        card = self._get_card_from_temp_queue(lookup_only=True)

        if card is None:
            card = self.cards_queue[index]

        return card

    def size(self) -> int:
        """

        @return: How many cards are in deck + temp deck.
        """

        return len(self.cards_queue) + len(self.temp_cards_queue)
