from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.ProcessRecorder import ProcessRecorder
from battle.businesslogic.recorder.Turn import Turn
from battle.businesslogic.tests.Creator import Creator


class ProcessRecorderTestCase(TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()
        attacker, defender = cls.creator.get_user_profile_models()
        cls.attacker = PlayerFactory.get_instance().create(attacker, is_attacker=True)
        cls.defender = PlayerFactory.get_instance().create(defender, is_attacker=False)

    def test_creation(self):
        recorder = ProcessRecorder()
        self.assertIs(recorder.get_winner(), None)
        self.assertEqual(recorder.get_turns(), [])

    def test_turn_recording(self):
        recorder = ProcessRecorder()
        recorder.record_turn(Turn(self.attacker, self.defender, self.attacker))

        # Testing first turn
        self.assertEqual(recorder.turns[0].attacker.get_stats().hp, self.attacker.get_hp())
        self.assertEqual(recorder.turns[0].defender.get_stats().hp, self.defender.get_hp())

        # Testing second turn
        player_hp_before_alteration = self.attacker.get_hp()
        dmg = 10
        # We damage the players to change their attributes
        self.attacker.statistics.deal_damage(dmg)
        self.defender.statistics.deal_damage(dmg)

        recorder.record_turn(Turn(self.attacker, self.defender, self.defender))

        # We're checking if the previous state remains intact
        self.assertEqual(recorder.turns[0].attacker.get_stats().hp, player_hp_before_alteration)
        self.assertEqual(recorder.turns[0].defender.get_stats().hp, player_hp_before_alteration)

        self.assertEqual(recorder.turns[1].attacker.get_stats().hp, self.attacker.get_hp())
        self.assertEqual(recorder.turns[1].defender.get_stats().hp, self.defender.get_hp())

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
