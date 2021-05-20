from typing import List, Optional

from battle.businesslogic.BattleOutcome import BattleOutcome
from battle.businesslogic.battle_recording.InitialBattleState import InitialBattleState
from battle.businesslogic.battle_recording.PlayerChange import PlayerChange
from battle.businesslogic.battle_recording.PlayersChanges import PlayersChanges
from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect
from cards.models import CardEffect, CardLevelEffects
from .BattleTurn import BattleTurn
from ..BattlePlayer import BattlePlayer
from .PlayerState import PlayerState


class BattleRecorder:
    def __init__(self, attacker: BattlePlayer, defender: BattlePlayer):
        self.attacker_state = PlayerState(attacker)

        self.defender_state = PlayerState(defender)

        self.initial_battle_state = InitialBattleState(self.attacker_state, self.defender_state)

        self.turns: List[BattleTurn] = []
        self.winner = None

    def record_turn(self, card_executor: BattlePlayer, battle_outcome: BattleOutcome,
                    effects: Optional[List[BattleCardEffect]]=None):
        executor_state = self.__get_player_state__(card_executor.id)
        used_card_number: int = executor_state.next_card_number
        executor_state.update_next_card_number()

        attacker_change = self.attacker_state.update()
        defender_change = self.defender_state.update()
        self.__check_if_winner__(battle_outcome)

        turn = BattleTurn(card_executor.id, used_card_number, PlayersChanges(attacker_change, defender_change))
        self.turns.append(turn)
        return turn

    def __check_if_winner__(self, battle_outcome: BattleOutcome):
        winner = battle_outcome.get_winner()
        if winner is not None:
            self.winner = winner.id

    def __get_player_state__(self, player_id: int) -> PlayerState:
        if player_id == self.attacker_state.player.id:
            return self.attacker_state
        elif player_id == self.defender_state.player.id:
            return self.defender_state
        return None

    def __get_opponent_state__(self, player_id: int) -> PlayerState:
        if player_id == self.attacker_state.player.id:
            return self.defender_state
        elif player_id == self.defender_state.player.id:
            return self.attacker_state
        return None
