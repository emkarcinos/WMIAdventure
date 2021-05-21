from IngameUsers.models import UserProfile
from .Coordinator import Coordinator
from .Outcome import Outcome
from .PlayerFactory import PlayerFactory
from .recorder.ProcessRecorder import ProcessRecorder


class Battle:
    def __init__(self, attacker_model: UserProfile, defender_model: UserProfile):
        player_factory = PlayerFactory.get_instance()
        self.attacker = player_factory.create(attacker_model, is_attacker=True)
        self.defender = player_factory.create(defender_model, is_attacker=False)
        self.coordinator = Coordinator(attacker=self.attacker,
                                       defender=self.defender)
        self.outcome = Outcome(attacker=self.attacker,
                               defender=self.defender)

        self.recorder = ProcessRecorder()

    def start(self):
        # We record initial battle state (0th turn)
        self.recorder.record_turn(self.attacker, self.defender)
        while not self.is_finished():
            self.turn()

    def turn(self):
        """
        Tasks executed within a single turn.
        """
        self.coordinator.next_turn()
        self.recorder.record_turn(self.attacker, self.defender)

    def is_finished(self):
        return self.outcome.is_done()
