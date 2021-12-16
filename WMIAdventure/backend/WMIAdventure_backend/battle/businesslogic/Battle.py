from IngameUsers.models import UserProfile
from .Coordinator import Coordinator
from .Outcome import Outcome
from .PlayerFactory import PlayerFactory
from .recorder.ProcessRecorder import ProcessRecorder
from ..signals import on_battle_end


class Battle:
    def __init__(self, attacker_model: UserProfile, defender_model: UserProfile):
        """

        @param attacker_model:
        @param defender_model:
        @raise BadBattleProfileException: If one of the user models doesn't have deck.
        """

        player_factory = PlayerFactory.get_instance()
        self.attacker = player_factory.create(attacker_model, is_attacker=True)
        self.defender = player_factory.create(defender_model, is_attacker=False)
        self.coordinator = Coordinator(attacker=self.attacker,
                                       defender=self.defender)
        self.outcome = Outcome(attacker=self.attacker,
                               defender=self.defender)

        self.recorder = ProcessRecorder(self.attacker, self.defender)
        self.turns_count = 0

    def start(self):
        while not self.is_finished():
            self.turn()
        on_battle_end(self.outcome)

    def turn(self):
        """
        Tasks executed within a single turn.
        """

        self.coordinator.next_turn(self.recorder)
        self.turns_count += 1

    def is_finished(self):
        return self.outcome.is_done(self.turns_count)
