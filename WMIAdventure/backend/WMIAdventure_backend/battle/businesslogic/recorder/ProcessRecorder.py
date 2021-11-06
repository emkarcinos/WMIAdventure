from typing import Union

from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.Turn import Turn


class ProcessRecorder:
    """
    Registers every turn that has happened in a single Battle.
    """
    turns: list[Turn]
    winner: Union[Player, None]

    def __init__(self):
        self.turns = []
        self.winner = None

    def record_turn(self, turn: Turn):
        """
        Saves the turn.
        """

        self.turns.append(turn)

    def set_winner(self, winner: Player):
        """
        Sets the winner.
        @param winner: Winning Player instance
        """
        self.winner = winner

    def get_turns(self) -> list[Turn]:
        """
        Returns an array of turns recorded in this process.
        """

        return self.turns

    def get_winner(self) -> Union[Player, None]:
        """
        Returns a winner. This may return None whenever there is a tie (or some other bug)
        """

        return self.winner
