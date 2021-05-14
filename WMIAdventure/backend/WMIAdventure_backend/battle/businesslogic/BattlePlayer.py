import queue

from IngameUsers.models import Deck
from IngameUsers.models import UserProfile
from .BattleCard import BattleCard
from .Statistics import Statistics


class BattlePlayer:
    """
    This class represents a player in the battle.
    It gets populated with model data.
    Has statistics that represent its current state and its card deck.
    """

    def __init__(self, user_model: UserProfile):
        """
        Creates BattlePlayer instance by extracting user's info from database model.
        @param user_model: Database user model.
        """

        deck_model: Deck = user_model.deck.deck
        self._create_deck(deck_model)

        self.statistics = Statistics()

    def _create_deck(self, deck_model: Deck):
        self.deck = queue.Queue()

        self.deck.put(BattleCard(deck_model.card1))
        self.deck.put(BattleCard(deck_model.card2))
        self.deck.put(BattleCard(deck_model.card3))
        self.deck.put(BattleCard(deck_model.card4))
        self.deck.put(BattleCard(deck_model.card5))
