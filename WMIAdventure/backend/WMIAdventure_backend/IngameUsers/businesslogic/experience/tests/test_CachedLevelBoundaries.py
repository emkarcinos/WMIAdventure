import unittest

from IngameUsers.businesslogic.experience.CachedLevelBoundaries import CachedLevelBoundaries
from IngameUsers.businesslogic.experience.formulas import level_to_exp


class CachedLevelBoundariesTestCase(unittest.TestCase):
    def tearDown(self) -> None:
        CachedLevelBoundaries.boundaries_cache = {}
        CachedLevelBoundaries.level_to_exp_func = level_to_exp
        
    def test_should_get_value_on_cache_miss(self):
        CachedLevelBoundaries.boundaries_cache = {}
        mock_returns = 12345

        def level_to_exp_mock(level):
            return mock_returns

        CachedLevelBoundaries.level_to_exp_func = level_to_exp_mock
        retval = CachedLevelBoundaries.get_min_exp_for_level(5)
        self.assertEqual(retval, mock_returns)

    def test_should_get_value_on_cache_hit(self):
        level = 5
        expected_exp = 11111

        CachedLevelBoundaries.boundaries_cache = {
            5: expected_exp
        }

        retval = CachedLevelBoundaries.get_min_exp_for_level(level)
        self.assertEqual(retval, expected_exp)
