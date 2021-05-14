from WMIAdventure.backend.WMIAdventure_backend.IngameUsers.models import UserProfile
from BattlePlayer import BattlePlayer
from Coordinator import Coordinator
from BattleOutcome import BattleOutcome


class Battle:
    def __init__(self, attacker_model: UserProfile, defender_model: UserProfile):
        self.attacker = BattlePlayer(attacker_model)
        self.defender = BattlePlayer(defender_model)
        self.coordinator = Coordinator(attacker=self.attacker,
                                       defender=self.defender)
        self.outcome = BattleOutcome(attacker=self.attacker,
                                     defender=self.defender)

    def start(self):
        while self.is_finished():
            self.coordinator.next_turn()

    def is_finished(self):
        return self.outcome.is_completed()
