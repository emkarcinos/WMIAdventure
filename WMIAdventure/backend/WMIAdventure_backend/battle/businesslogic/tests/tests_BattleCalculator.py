from unittest import TestCase

from .Creator import Creator
from ..BattleCalculator import BattleCalculator
from ..BattleDeck import BattleDeck
from ..BattlePlayer import BattlePlayer


class BattleCalculatorTestCase(TestCase):
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

        self.instance = BattleCalculator.get_instance()

    def test_singleton(self):
        self.assertIsNotNone(self.instance)

    def test_deal_dmg_to(self):
        dmg = 5
        self.instance.deal_dmg_to(self.battle_player, dmg)

        expected_hp = self.battle_player.statistics.MAX_HP - dmg
        actual_hp = self.battle_player.statistics.hp
        self.assertEqual(actual_hp, expected_hp)

    def test_calculate_effect_power(self):
        base_power = 5
        power_range = 2

        expected_min_power = base_power - power_range
        expected_max_power = base_power + power_range

        for i in range(100):
            actual_power = self.instance.calculate_effect_power(base_power, power_range, None)

            self.assertTrue(actual_power >= expected_min_power)
            self.assertTrue(actual_power <= expected_max_power)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
