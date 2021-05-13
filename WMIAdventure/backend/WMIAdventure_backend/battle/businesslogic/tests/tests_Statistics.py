from unittest import TestCase

from ..Statistics import Statistics


class StatisticsTestCase(TestCase):
    def setUp(self) -> None:
        self.statistics = Statistics()

    def test_damage_no_armour(self):
        dmg = 18.0
        self.statistics.deal_damage(dmg)

        self.assertEqual(self.statistics.MAX_HP - dmg, self.statistics.hp)

    def test_damage_with_armour(self):
        armour = 10.0
        self.statistics.armour = armour

        dmg = 18.0

        self.statistics.deal_damage(dmg)
        expected_armour = max(0.0, armour - dmg)
        expected_hp = self.statistics.MAX_HP - max(0.0, dmg - armour)

        self.assertEqual(expected_armour, self.statistics.armour)
        self.assertEqual(expected_hp, self.statistics.hp)

    def test_overhealing(self):
        heal_amount = 20.0
        self.statistics.heal(heal_amount)

        self.assertEqual(self.statistics.MAX_HP, self.statistics.hp)

    def test_healing(self):
        initial_hp = 50.0
        self.statistics.hp = initial_hp
        heal_amount = 20.0

        self.statistics.heal(heal_amount)
        self.assertEqual(self.statistics.hp, initial_hp + heal_amount)

    def test_overarmour(self):
        initial_amour = 18.0
        self.statistics.armour = initial_amour
        armour_buff = 1000.0

        self.statistics.add_armour(armour_buff)

        self.assertEqual(self.statistics.armour, self.statistics.MAX_ARMOUR)

    def test_armour_add(self):
        armour_buff = 10.0
        self.statistics.add_armour(armour_buff)

        self.assertEqual(armour_buff, self.statistics.armour)
