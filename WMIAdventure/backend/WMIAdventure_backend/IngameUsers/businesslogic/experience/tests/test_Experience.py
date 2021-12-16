import unittest

from IngameUsers.businesslogic.experience.Experience import Experience
from IngameUsers.businesslogic.experience.formulas import level_to_exp


class ExperienceTestCase(unittest.TestCase):
    def test_should_transform_exp_to_level_correctly(self):
        expected_level = 20
        exp = level_to_exp(expected_level) + 1
        experience_obj = Experience(exp)
        self.assertEqual(experience_obj.level, expected_level)

    def test_should_transform_exp_to_level_correctly_first_level(self):
        expected_level = 1
        exp = 1
        experience_obj = Experience(exp)
        self.assertEqual(experience_obj.level, expected_level)

    def test_should_transform_exp_to_level_correctly_fib_case(self):
        expected_level = 5
        exp = level_to_exp(expected_level) + 1
        experience_obj = Experience(exp)
        self.assertEqual(experience_obj.level, expected_level)

    def test_should_assign_next_level_exp_required_correctly(self):
        level = 21
        exp_over_initial = 111
        exp = level_to_exp(level) + exp_over_initial
        experience_obj = Experience(exp)
        expected_exp_required = abs(exp - level_to_exp(level + 1))
        self.assertEqual(experience_obj.exp_required_to_level_up, expected_exp_required)

    def test_should_calculate_percentage_correctly(self):
        exp = 5
        # Next level is at 10
        experience_obj = Experience(exp)
        self.assertEqual(experience_obj.next_level_percent, 50)

    def test_should_calculate_percentage_correctly_when_zero_exp(self):
        exp = 0
        # Next level is at 10
        experience_obj = Experience(exp)
        self.assertEqual(experience_obj.next_level_percent, 0)

    def test_should_calculate_percentage_correctly_when_100_percent(self):
        exp = 10
        # Next level is at 10
        experience_obj = Experience(exp)
        # Should not return 100, because we are a level higher
        self.assertEqual(experience_obj.next_level_percent, 0)
