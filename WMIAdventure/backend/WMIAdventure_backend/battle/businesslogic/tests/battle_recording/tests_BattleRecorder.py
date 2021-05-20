from typing import List
from unittest import TestCase

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.BattleDeck import BattleDeck
from battle.businesslogic.BattleOutcome import BattleOutcome
from battle.businesslogic.BattlePlayer import BattlePlayer
from battle.businesslogic.battle_recording.BattleRecorder import BattleRecorder
from battle.businesslogic.battle_recording.BattleTurn import BattleTurn
from battle.businesslogic.battle_recording.InitialBattleState import InitialBattleState
from battle.businesslogic.battle_recording.PlayerState import PlayerState
from battle.businesslogic.tests.Creator import Creator


class BattleRecorderTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.attacker_model, cls.defender_model = cls.creator.get_user_models()
        cls.attacker_deck_model, cls.defender_deck_model = cls.creator.get_decks()

    def setUp(self):
        self.attacker = BattlePlayer(self.attacker_model.id, BattleDeck(self.attacker_deck_model))
        self.defender = BattlePlayer(self.defender_model.id, BattleDeck(self.defender_deck_model))

        self.battle_outcome = BattleOutcome(self.attacker, self.defender)

        self.battle_recorder = BattleRecorder(self.attacker, self.defender)

    def test_create(self):
        self.assertEqual(self.battle_recorder.attacker_state.player.id, self.attacker.id)
        self.assertEqual(self.battle_recorder.defender_state.player.id, self.defender.id)

        self.assertTrue(isinstance(self.battle_recorder.initial_battle_state, InitialBattleState))

        self.assertEqual(len(self.battle_recorder.turns), 0)
        self.assertIsNone(self.battle_recorder.winner)

    def test_check_if_winner1(self):
        """
        Scenario1: Battle not yet finished.
        """

        self.battle_recorder.__check_if_winner__(self.battle_outcome)
        self.assertIsNone(self.battle_recorder.winner)

    def test_check_if_winner2(self):
        """
        Scenario2: Battle finished.
        """

        self.attacker.statistics.hp = 0.0
        self.battle_outcome.is_done()

        self.battle_recorder.__check_if_winner__(self.battle_outcome)
        self.assertEqual(self.battle_recorder.winner, self.battle_outcome.get_winner().id)

    def test_get_player_state(self):
        expected_player_state = self.battle_recorder.attacker_state
        actual_player_state = self.battle_recorder.__get_player_state__(self.attacker.id)
        self.assertIs(actual_player_state, expected_player_state)

    def test_get_opponent_state(self):
        expected_player_state = self.battle_recorder.defender_state
        actual_player_state = self.battle_recorder.__get_opponent_state__(self.attacker.id)
        self.assertIs(actual_player_state, expected_player_state)

    def test_record_turn(self):
        expected_attacker_next_used_card = self.battle_recorder.attacker_state.next_card_number + 1
        expected_defender_next_used_card = self.battle_recorder.defender_state.next_card_number

        expected_attacker_hp_change = -10
        expected_defender_armour_change = 50

        expected_card_executor_id = self.attacker.id

        expected_used_card_number = self.battle_recorder.attacker_state.next_card_number

        self.attacker.statistics.hp += expected_attacker_hp_change
        self.defender.statistics.armour += expected_defender_armour_change

        recorded_turn: BattleTurn = self.battle_recorder.record_turn(self.attacker, self.battle_outcome)

        # Test if next used card is updated in appropriate player
        actual_attacker_next_used_card = self.battle_recorder.attacker_state.next_card_number
        self.assertEqual(actual_attacker_next_used_card, expected_attacker_next_used_card)

        actual_defender_next_used_card = self.battle_recorder.defender_state.next_card_number
        self.assertEqual(actual_defender_next_used_card, expected_defender_next_used_card)

        # Test if there is appropriate executor card id in recorded turn
        self.assertEqual(recorded_turn.card_executor_id, expected_card_executor_id)

        # Test if there is appropriate used card number in recorded turn
        self.assertEqual(recorded_turn.used_card_number, expected_used_card_number)

        # Test if there are appropriate PlayersChanges in recorded turn
        actual_attacker_change = recorded_turn.players_changes.attacker_change
        self.assertEqual(actual_attacker_change.hp, expected_attacker_hp_change)

        actual_defender_change = recorded_turn.players_changes.defender_change
        self.assertEqual(actual_defender_change.armour, expected_defender_armour_change)

        # Test if recorded turn is being added to turns list
        self.assertIs(recorded_turn, self.battle_recorder.turns[-1])

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
