from typing import List

from battle.businesslogic.effects.Effect import Effect
from .Deck import Deck
from .Statistics import Statistics


class Player:
    """
    This class represents a player in the battle.
    It gets populated with model data.
    Has statistics that represent its current state and its card deck.
    """

    def __init__(self, id: int, deck: Deck):
        """
        Creates BattlePlayer instance.
        @param id: ID Related to user in database
        @param deck: Card deck of its user.
        """

        self.id = id
        self.deck = deck

        self.statistics = Statistics()

    def get_hp(self) -> int:
        return self.statistics.hp

    def use_card(self) -> List[Effect]:
        """
        Uses card which is first in deck to use and then places that card at the end of the deck.
        @return: List of effects of proper card to be executed by battle simulation.
        """

        card = self.deck.get_card()
        return card.use()
