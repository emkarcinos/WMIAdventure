from django.test import TestCase

from battle.businesslogic.Statistics import Statistics
from battle.businesslogic.recorder.effects_impacts.StatsChangedEffectImpact import StatsChangedEffectImpact


class StatsChangedEffectImpactTestCase(TestCase):
    def test_stats_are_copied(self):
        """
        **Scenario:**

        - StatsChangedEffectImpact is created from some Statistics.

        - This Statistics are changed.

        ---

        **Expected result:**

        - StatsChangedEffectImpact have properly copied stats - they are not affected by change in original Statistics.
        """

        original_stats = Statistics()

        # Create effect impact
        _ = 1
        effect_impact = StatsChangedEffectImpact(_, _, _, original_stats)

        # Save hp before change
        hp_before_change = effect_impact.changed_stats.hp

        # Change hp in original stats
        original_stats.hp -= 10

        # Assert hp in effect impact wasn't changed
        self.assertEquals(hp_before_change, effect_impact.changed_stats.hp)
