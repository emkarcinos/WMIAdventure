from unittest import TestCase

from battle.businesslogic.battle_recording.PlayerChange import PlayerChange


class PlayerChangeTestCase(TestCase):
    def setUp(self):
        self.player_id = 1
        self.old_hp = 100
        self.old_armour = 0

    def test_change(self):
        new_hp = 90

        expected_hp_change = -10

        new_armour = 50

        expected_armour_change = 50

        actual_change = PlayerChange(self.player_id, self.old_hp, new_hp, self.old_armour, new_armour)

        self.assertEqual(actual_change.hp, expected_hp_change)
        self.assertEqual(actual_change.armour, expected_armour_change)
        self.assertIsNone(actual_change.deck)

    def test_no_change_is_none(self):
        new_hp = self.old_hp
        new_armour = self.old_armour

        actual_change = PlayerChange(self.player_id, self.old_hp, new_hp, self.old_armour, new_armour)

        self.assertIsNone(actual_change.hp)
        self.assertIsNone(actual_change.armour)
        self.assertIsNone(actual_change.deck)
        self.assertIsNone(actual_change.defeated)
