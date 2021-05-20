from typing import List
from unittest import TestCase

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.BattleDeck import BattleDeck
from battle.businesslogic.BattlePlayer import BattlePlayer
from battle.businesslogic.battle_recording.CardData import CardData
from battle.businesslogic.battle_recording.PlayerState import PlayerState
from ..Creator import Creator


class PlayerStateTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.attacker_model, cls.defender_model = cls.creator.get_user_models()
        cls.attacker_deck_model, cls.defender_deck_model = cls.creator.get_decks()

    def setUp(self):
        self.attacker = BattlePlayer(self.attacker_model.id, BattleDeck(self.attacker_deck_model))
        self.defender = BattlePlayer(self.defender_model.id, BattleDeck(self.defender_deck_model))

        self.attacker_state = PlayerState(self.attacker)
        self.defender_state = PlayerState(self.defender)

    def test_create(self):
        self.assertIs(self.attacker_state.player, self.attacker)
        self.assertEqual(self.attacker_state.hp, self.attacker.statistics.hp)
        self.assertEqual(self.attacker_state.armour, self.attacker.statistics.armour)
        self.assertEqual(self.attacker_state.next_card_number, 1)

        expected_deck: List[BattleCard] = list(self.attacker.deck.cards_queue)
        for i in range(len(expected_deck)):
            expected_card_id = expected_deck[i].card_model.info.id
            expected_level = expected_deck[i].card_model.level.level

            actual_card_id = self.attacker_state.player_deck[i].card_id
            actual_level = self.attacker_state.player_deck[i].level

            self.assertEqual(actual_card_id, expected_card_id)
            self.assertEqual(actual_level, expected_level)

    def test_update_not_defeated(self):
        expected_hp_change = -10
        expected_armour_change = 10
        expected_next_card_number = self.attacker_state.next_card_number

        self.attacker.statistics.hp += expected_hp_change
        self.attacker.statistics.armour += expected_armour_change

        actual_change = self.attacker_state.update()

        self.assertEqual(actual_change.player_id, self.attacker.id)
        self.assertEqual(actual_change.hp, expected_hp_change)
        self.assertEqual(actual_change.armour, expected_armour_change)
        self.assertIsNone(actual_change.deck)
        self.assertIsNone(actual_change.defeated)
        self.assertEqual(self.attacker_state.next_card_number, expected_next_card_number)

    def test_update_player_defeated(self):
        expected_hp_change = -100

        self.attacker.statistics.hp += expected_hp_change

        actual_change = self.attacker_state.update()

        self.assertTrue(actual_change.defeated)

        self.assertEqual(actual_change.hp, expected_hp_change)
        self.assertIsNone(actual_change.armour)
        self.assertIsNone(actual_change.deck)

    def test_update_next_card_number(self):
        expected_numbers = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
        for expected_number in expected_numbers:
            actual_next_card_number = self.attacker_state.next_card_number
            self.assertEqual(actual_next_card_number, expected_number)

            self.attacker_state.update_next_card_number()

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
