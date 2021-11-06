from unittest import TestCase

from .Creator import Creator
from ..BattleCard import BattleCard
from ..Deck import Deck
from ..Player import Player


class PlayerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()
        cls.user_profile_model = cls.creator.user_profile_model1
        cls.deck_model = cls.creator.get_attacker_deck(1)

    def setUp(self) -> None:
        self.battle_player = Player(
            self.user_profile_model.user.id,
            Deck(self.deck_model)
        )

    def test_use_card(self):
        expected_used_card: BattleCard = list(self.battle_player.deck.cards_queue)[0]
        expected_effects = expected_used_card.effects

        actual_used_card, actual_effects = self.battle_player.use_card()

        self.assertIs(actual_used_card, expected_used_card)

        for actual_effect, expected_effect in zip(actual_effects, expected_effects):
            self.assertIs(actual_effect, expected_effect)

    def test_get_hp(self):
        expected_hp = self.battle_player.statistics.MAX_HP
        actual_hp = self.battle_player.get_hp()

        self.assertEqual(actual_hp, expected_hp)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
