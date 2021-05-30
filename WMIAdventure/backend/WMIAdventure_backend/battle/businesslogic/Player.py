from typing import List

from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.player_states.PlayerState import PlayerState
from .Deck import Deck
from .Statistics import Statistics


class Player:
    """
    This class represents a player in the battle.
    It gets populated with model data.
    Has statistics that represent its current state and its card deck.
    """
    states: List[PlayerState]

    def __init__(self, id: int, deck: Deck):
        """
        Creates BattlePlayer instance.
        @param id: ID Related to user in database
        @param deck: Card deck of its user.
        """

        self.id = id
        self.deck = deck

        self.statistics = Statistics()
        self.states = []

    def get_hp(self) -> int:
        return self.statistics.hp

    def use_card(self) -> List[Effect]:
        """
        Uses card which is first in deck to use and then places that card at the end of the deck.
        @return: List of effects of proper card to be executed by battle simulation.
        """

        self.__update__()

        card = self.deck.get_card()

        for state in self.states:
            card = state.player_uses_card(card)

        if card is not None:
            return card.use()
        return []

    def add_state(self, state: PlayerState):
        self.states.append(state)

    def __update__(self):
        self.__update__states__()

    def __update__states__(self):
        for state in self.states:
            state.update()

        self.__remove__inactive_states__()

    def __remove__inactive_states__(self):
        for state in self.states:
            if not state.active:
                self.states.remove(state)
