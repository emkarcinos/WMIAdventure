from .PlayerState import PlayerState
from copy import deepcopy


class InitialBattleState:
    defender_state: PlayerState
    attacker_state: PlayerState

    def __init__(self, init_attacker_state: PlayerState, init_defender_state: PlayerState):
        self.attacker_state = deepcopy(init_attacker_state)
        self.defender_state = deepcopy(init_defender_state)
