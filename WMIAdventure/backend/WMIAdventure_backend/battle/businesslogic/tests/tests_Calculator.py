from unittest import TestCase

from .Creator import Creator
from ..Buff import Buff
from ..Calculator import Calculator
from ..Deck import Deck
from ..Player import Player


class CalculatorTestCase(TestCase):
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

        self.instance = Calculator.get_instance()

        self.buffs = self.create_buffs()

        self.base_power = 5
        self.power_range = 2

        self.max_power_without_buffs = self.base_power + self.power_range
        self.min_power_without_buffs = self.base_power - self.power_range

    def test_singleton(self):
        self.assertIsNotNone(self.instance)

    def test_power_without_buffs(self):
        for i in range(100):
            actual_power = self.instance._power_without_buffs(self.base_power,
                                                              self.power_range)

            self.assertGreaterEqual(actual_power, self.min_power_without_buffs)
            self.assertLessEqual(actual_power, self.max_power_without_buffs)

    def test_calculate_modifiers_influence(self):
        expected_modifiers_influence = 0
        for i in range(len(self.buffs)):
            expected_modifiers_influence += self.modifier

        actual_modifiers_influence = self.instance._calculate_modifiers_influence(self.buffs)

        self.assertEqual(actual_modifiers_influence, expected_modifiers_influence)

    def test_calculate_multipliers_influence(self):
        negative_inf = 1
        for negative_mult in self.negative_multipliers:
            negative_inf *= negative_mult

        positive_inf = 1
        for positive_mult in self.positive_multipliers:
            positive_inf += positive_mult - 1

        expected_multipliers_influence = positive_inf * negative_inf

        actual_multipliers_influence = self.instance._calculate_multipliers_influence(self.buffs)

        self.assertEqual(actual_multipliers_influence, expected_multipliers_influence)

    def test_calculate_buffs_influence(self):

        expected_power = \
            self.base_power * \
            self.instance._calculate_multipliers_influence(self.buffs) + \
            self.instance._calculate_modifiers_influence(self.buffs)

        actual_power = self.instance._calculate_buffs_influence(self.base_power, self.buffs)

        self.assertEqual(actual_power, expected_power)

    def test_calculate_effect_power(self):
        expected_min_value = self.instance._calculate_buffs_influence(self.min_power_without_buffs, self.buffs)
        expected_max_value = self.instance._calculate_buffs_influence(self.max_power_without_buffs, self.buffs)

        for i in range(100):
            actual_value = self.instance.calculate_effect_power(self.base_power, self.power_range, self.buffs)
            self.assertGreaterEqual(actual_value, expected_min_value)
            self.assertLessEqual(actual_value, expected_max_value)
            
    def test_negative_fix(self):
        import random
        
        # This seed returns a negative power inside the calculator.
        random.seed(241241)
        
        # Calculated effect power of this ranges should never drop below zero.
        power = 1
        range = 10
        val = self.instance.calculate_effect_power(power, range, [])
        
        self.assertEqual(0, val)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()

    def create_buffs(self):
        buffs = []

        self.positive_multipliers = [2.0, 3.0, 5.0]
        self.modifier = 5

        self.negative_multipliers = [0.25, 0.25, 0.5, 0.75]

        for multiplier in self.positive_multipliers + self.negative_multipliers:
            buffs.append(
                Buff(multiplier=multiplier, modifier=self.modifier)
            )

        return buffs
