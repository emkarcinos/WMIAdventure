from django.test import TestCase

from battle.businesslogic.recorder.simplified_players.BaseSimplifiedPlayer import BaseSimplifiedPlayer
from battle.businesslogic.tests.factories import create_player


class BaseSimplifiedPlayerTestCase(TestCase):
    def test_creation(self):
        """
        **Scenario:**

        - BaseSimplifiedPlayer is created from some Player
        - Player has changed hp

        **Expected result:**

        - BaseSimplifiedPlayer contains proper data
        - Player's stats change doesn't affect stats of created BaseSimplifiedPlayer

        """

        player = create_player()
        base_s_p = BaseSimplifiedPlayer(player)

        self.assertEquals(base_s_p.id, player.id)
        self.assertEquals(base_s_p.stats.hp, player.statistics.hp)
        self.assertEquals(base_s_p.stats.armour, player.statistics.armour)

        # Save hp before change
        expected_hp = base_s_p.stats.hp

        # Change player's hp
        player.statistics.hp -= 10

        # Assert hp is the same
        self.assertEquals(base_s_p.stats.hp, expected_hp)
