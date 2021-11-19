from .Player import Player
from .TurnsQueue import TurnsQueue
from .recorder.ProcessRecorder import ProcessRecorder


class Coordinator:
    """
    This class is responsible for handling battle logic.
    Stores players and runs their turns.
    """

    def __init__(self, attacker: Player, defender: Player) -> None:
        self.attacker = attacker
        self.defender = defender
        self.turnsQueue = TurnsQueue(self.attacker, self.defender)

    def get_players_opponent(self, player) -> Player:
        # Effect activation requires a target player as an argument, so we calculate this here.
        return self.defender if player is self.attacker else self.attacker

    def next_turn(self, recorder: ProcessRecorder) -> None:
        current_player = self.turnsQueue.turn()
        recorder.record_turn_start(self.attacker, self.defender, current_player)

        used_card, used_effects = current_player.use_card()
        recorder.record_card_usage(used_card)

        for effect in used_effects:
            effect_impact = effect.activate(current_player, self.get_players_opponent(current_player), self.turnsQueue)
            recorder.record_effect_usage(effect_impact)

        recorder.record_turn_end()
