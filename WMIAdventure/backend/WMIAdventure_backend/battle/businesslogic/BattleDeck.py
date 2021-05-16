from collections import deque

from IngameUsers.models import Deck
from .BattleCard import BattleCard


class BattleDeck:

    def __init__(self, deck_model: Deck):
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
