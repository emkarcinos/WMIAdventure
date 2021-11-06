from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.ProcessRecorder import ProcessRecorder
from battle.businesslogic.tests.Creator import Creator


class ProcessRecorderTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def test_creation(self):
        recorder = ProcessRecorder(self.attacker, self.defender)
        self.assertIs(recorder.get_winner(), None)
        self.assertEqual(recorder.get_states(), [])

    def test_turn_recording(self):
        recorder = ProcessRecorder(self.attacker, self.defender)
        # Testing first turn
        self.assertEqual(recorder.initial_state.attacker.get_stats().hp, self.attacker.get_hp())
        self.assertEqual(recorder.initial_state.defender.get_stats().hp, self.defender.get_hp())

        # Testing second turn
        player_hp_before_alteration = self.attacker.get_hp()
        dmg = 10
        # We damage the players to change their attributes
        self.attacker.statistics.deal_damage(dmg)
        self.defender.statistics.deal_damage(dmg)

        recorder.record_turn(self.attacker, self.defender)

        # We're checking if the previous state remains intact
        self.assertEqual(recorder.initial_state.attacker.get_stats().hp, player_hp_before_alteration)
        self.assertEqual(recorder.initial_state.defender.get_stats().hp, player_hp_before_alteration)

        self.assertEqual(recorder.states[0].attacker.get_stats().hp, self.attacker.get_hp())
        self.assertEqual(recorder.states[0].defender.get_stats().hp, self.defender.get_hp())


    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()