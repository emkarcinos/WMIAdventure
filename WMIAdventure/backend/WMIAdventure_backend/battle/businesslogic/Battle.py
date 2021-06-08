from IngameUsers.models import UserProfile
from .Coordinator import Coordinator
from .Outcome import Outcome
from .PlayerFactory import PlayerFactory
from .recorder.ProcessRecorder import ProcessRecorder


class Battle:
    """
    Maximum number of turns for battle (without it there could be case, where battle would never stop)
    """
    MAX_TURNS: int = 100

    def __init__(self, attacker_model: UserProfile, defender_model: UserProfile):
        player_factory = PlayerFactory.get_instance()
        self.attacker = player_factory.create(attacker_model, is_attacker=True)
        self.defender = player_factory.create(defender_model, is_attacker=False)
        self.coordinator = Coordinator(attacker=self.attacker,
                                       defender=self.defender)
        self.outcome = Outcome(attacker=self.attacker,
                               defender=self.defender)

        self.recorder = ProcessRecorder()
        self.turns_count = 0

    def start(self):
        self.set_up_battle()
        while not self.is_finished():
            self.turn()
            
    def set_up_battle(self):
        """
        Tasks executed before starting the battle.
        """
        
        # We record initial battle state (0th turn)
        self.recorder.record_turn(self.attacker, self.defender)
        
    def turn(self):
        """
        Tasks executed within a single turn.
        """
        self.coordinator.next_turn()
        self.recorder.record_turn(self.attacker, self.defender)
        self.turns_count += 1

    def is_finished(self):
        return self.outcome.is_done(self.turns_count, self.MAX_TURNS)
