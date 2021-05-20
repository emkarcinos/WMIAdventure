from unittest import TestCase

from battle.businesslogic.BattleDeck import BattleDeck
from battle.businesslogic.BattlePlayer import BattlePlayer
from battle.businesslogic.battle_recording.InitialBattleState import InitialBattleState
from battle.businesslogic.battle_recording.PlayerState import PlayerState
from battle.businesslogic.tests.Creator import Creator


class InitialBattleStateTestCase(TestCase):
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

        self.initial_battle_state = InitialBattleState(self.attacker_state, self.defender_state)

    def test_create(self):
        # Attacker
        self.assertIsNot(self.initial_battle_state.attacker_state, self.attacker_state)

        self.assertEqual(self.initial_battle_state.attacker_state.hp, self.attacker_state.hp)
        self.assertEqual(self.initial_battle_state.attacker_state.armour, self.attacker_state.armour)
        self.assertEqual(self.initial_battle_state.attacker_state.next_card_number, 
                         self.attacker_state.next_card_number)

        self.assertIsNot(self.initial_battle_state.attacker_state.player, self.attacker_state.player)
        self.assertEqual(self.initial_battle_state.attacker_state.player.id, self.attacker_state.player.id)

        # Defender
        self.assertIsNot(self.initial_battle_state.defender_state, self.defender_state)

        self.assertEqual(self.initial_battle_state.defender_state.hp, self.defender_state.hp)
        self.assertEqual(self.initial_battle_state.defender_state.armour, self.defender_state.armour)
        self.assertEqual(self.initial_battle_state.defender_state.next_card_number,
                         self.defender_state.next_card_number)

        self.assertIsNot(self.initial_battle_state.defender_state.player, self.defender_state.player)
        self.assertEqual(self.initial_battle_state.defender_state.player.id, self.defender_state.player.id)

    def test_initial_state_not_changed_after_update(self):
        expected_hp = self.attacker_state.hp
        expected_armour = self.attacker_state.armour
        expected_next_card_number = self.attacker_state.next_card_number

        self.attacker.statistics.hp -= 10
        self.attacker.statistics.armour += 50
        self.attacker_state.update()

        self.assertEqual(self.initial_battle_state.attacker_state.hp, expected_hp)
        self.assertEqual(self.initial_battle_state.attacker_state.armour, expected_armour)
        self.assertEqual(self.initial_battle_state.attacker_state.next_card_number, expected_next_card_number)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
