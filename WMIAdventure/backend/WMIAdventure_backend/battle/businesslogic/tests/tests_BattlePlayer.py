from unittest import TestCase

from .Creator import Creator
from ..BattleCard import BattleCard
from ..BattleDeck import BattleDeck
from ..BattlePlayer import BattlePlayer


class BattlePlayerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()
        cls.user_profile_model = cls.creator.user_profile_model1
        cls.deck_model = cls.creator.get_attacker_deck(1)

    def setUp(self) -> None:
        self.battle_player = BattlePlayer(
            self.user_profile_model.user.id,
            BattleDeck(self.deck_model)
        )

    def test_use_card(self):
        card_first_in_turn: BattleCard = list(self.battle_player.deck.cards_queue)[0]
        expected_effects = card_first_in_turn.effects

        actual_effects = self.battle_player.use_card()

        for actual_effect, expected_effect in zip(actual_effects, expected_effects):
            self.assertIs(actual_effect, expected_effect)

    def test_get_hp(self):
        expected_hp = self.battle_player.statistics.MAX_HP
        actual_hp = self.battle_player.get_hp()

        self.assertEqual(actual_hp, expected_hp)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
