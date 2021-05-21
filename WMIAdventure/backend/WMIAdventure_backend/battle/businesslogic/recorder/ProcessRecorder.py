from typing import Union

from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.State import State


class ProcessRecorder:
    """
    Registers every turn that has happened in a single Battle.
    """
    states: list[State]
    winner: Union[Player, None]

    def __init__(self):
        self.states = []
        self.winner = None

    def record_turn(self, attacker: Player, defender: Player):
        """
        Saves the turn.
        @param attacker: Attacking Player instance
        @param defender: Defending Player instance
        """
        self.states.append(State(attacker=attacker,
                                 defender=defender))

    def set_winner(self, winner: Player):
        """
        Sets the winner.
        @param winner: Winning Player instance
        """
        self.winner = winner

    def get_states(self) -> list[State]:
        """
        Returns an array of states recorded in this process.
        """
        return self.states

    def get_winner(self) -> Union[Player, None]:
        """
        Returns a winner. This may return None whenever there is a tie (or some other bug)
        """

        return self.winner
