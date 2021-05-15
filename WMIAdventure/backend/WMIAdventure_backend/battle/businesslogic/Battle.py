from BattleOutcome import BattleOutcome
from BattlePlayerFactory import BattlePlayerFactory
from Coordinator import Coordinator
from IngameUsers.models import UserProfile


class Battle:
    def __init__(self, attacker_model: UserProfile, defender_model: UserProfile):
        player_factory = BattlePlayerFactory.get_instance()
        self.attacker = player_factory.create(attacker_model, is_attacker=True)
        self.defender = player_factory.create(defender_model, is_attacker=False)
        self.coordinator = Coordinator(attacker=self.attacker,
                                       defender=self.defender)
        self.outcome = BattleOutcome(attacker=self.attacker,
                                     defender=self.defender)

    def start(self):
        while not self.is_finished():
            self.coordinator.next_turn()

    def is_finished(self):
        return self.outcome.is_done()
