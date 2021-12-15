from typing import Optional

from battle.businesslogic.effects.Effect import Effect
from .BattleCard import BattleCard
from .Deck import Deck
from .Statistics import Statistics


class Player:
    """
    This class represents a player in the battle.
    It gets populated with model data.
    Has statistics that represent its current state and its card deck.
    """

    def __init__(self, id: int, deck: Deck, level: int):
        """
        Creates BattlePlayer instance.
        @param id: ID Related to user in database
        @param deck: Card deck of its user.
        @param level: User's level.
        """

        self.id = id
        self.deck = deck
        self.level = level

        self.statistics = Statistics()
        self.turns_stopped = 0

    def get_hp(self) -> int:
        return self.statistics.hp

    def use_card(self) -> tuple[Optional[BattleCard], list[Effect]]:
        """
        Uses card which is first in deck to use and then places that card at the end of the deck.

        :return: Proper card and it's list of effects to be executed by battle simulation OR None and empty list
        if Player is stopped.
        """

        # If stopped, then do not use card
        if self.turns_stopped > 0:
            self.turns_stopped -= 1
            return None, []

        card = self.deck.get_card()
        return card, card.use()
