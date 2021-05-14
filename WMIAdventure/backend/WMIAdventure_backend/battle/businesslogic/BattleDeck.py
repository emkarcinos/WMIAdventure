from collections import deque

from BattleCard import BattleCard
from IngameUsers.models import Deck


class BattleDeck:

    def __init__(self, deck_model: Deck):
        """
        Creates BattleDeck instance.
        @param deck_model: Deck database model.
        """

        self.cards_queue = deque()

        self.cards_queue.append(BattleCard(deck_model.card1))
        self.cards_queue.append(BattleCard(deck_model.card2))
        self.cards_queue.append(BattleCard(deck_model.card3))
        self.cards_queue.append(BattleCard(deck_model.card4))
        self.cards_queue.append(BattleCard(deck_model.card5))
