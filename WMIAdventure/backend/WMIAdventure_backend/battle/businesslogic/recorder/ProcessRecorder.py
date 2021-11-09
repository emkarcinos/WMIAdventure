from typing import Union, Optional

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.Turn import Turn
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class ProcessRecorder:
    """
    Registers every turn that has happened in a single Battle.
    """
    current_turn: Optional[Turn]
    turns: list[Turn]
    winner: Union[Player, None]

    def __init__(self):
        self.turns = []
        self.winner = None
        self.current_turn = None

    def record_turn_start(self, attacker: Player, defender: Player, current_player: Player):
        """
        Records conditions at the start of turn.

        This method should be called right after determining which player will execute card in this turn.

        :param attacker:
        :param defender:
        :param current_player: Player that will execute card in this turn.
        :raises AssertionError: If trying to record new turn without recording end of current turn. See: record_turn_end
        """

        assert self.current_turn is None, "Trying to record new turn, when current is still being recorded."

        self.current_turn = Turn(attacker, defender, current_player)
        self.turns.append(self.current_turn)

    def record_card_usage(self, used_card: BattleCard):
        """
        Records which card was executed in this turn.

        This method should be called right after determining which card player will execute.

        :param used_card:
        :raises AssertionError: If trying to record card usage, when turn start wasn't recorded. See: record_turn_start
        """

        assert self.current_turn is not None, "There is no current turn."
        self.current_turn.record_card_usage(used_card)

    def record_effect_usage(self, used_effect: EffectImpact):
        """
        Records effect that was activated in this turn and what impact this effect caused on the game state.

        This method should be called right after activating effect.

        :param used_effect:
        :raises AssertionError: If trying to record card usage, when turn start wasn't recorded. See: record_turn_start
        """

        assert self.current_turn is not None, "There is no current turn."
        self.current_turn.record_effect_usage(used_effect)

    def record_turn_end(self):
        """
        Should be called at the end of turn.

        :raises AssertionError: If trying to record end of turn, which wasn't recorded. See: record_turn_start
        """

        assert self.current_turn is not None, "Trying to record end of turn, which wasn't recorded."
        self.current_turn = None

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
