from django.test import TestCase

from IngameUsers.businesslogic.skill_points import calculate_skill_points_gain


class SkillPointsTestCase(TestCase):
    def test_calculate_skill_points_gain(self):
        """
        **Scenario:**

        - User had level 1 before, now has level 10.

        - Skill points for him are being calculated.

        ---

        **Expected result:**

        - Skill points are calculated properly.
        """

        level_before = 1
        level_after = 10
        expected_skill_points_gain = 90
        actual_skill_points_gain = calculate_skill_points_gain(level_before, level_after)
        self.assertEqual(actual_skill_points_gain, expected_skill_points_gain)
