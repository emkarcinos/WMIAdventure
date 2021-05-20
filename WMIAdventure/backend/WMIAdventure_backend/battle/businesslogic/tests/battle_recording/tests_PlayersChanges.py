from unittest import TestCase

from battle.businesslogic.battle_recording.PlayerChange import PlayerChange
from battle.businesslogic.battle_recording.PlayersChanges import PlayersChanges


class PlayersChangesTestCase(TestCase):
    def setUp(self):
        self.attacker_id = 1
        
        self.attacker_old_hp = 100
        self.attacker_new_hp = 90
        self.attacker_old_armour = 0
        self.attacker_new_armour = 0

        self.attacker_change = PlayerChange(self.attacker_id,
                                            self.attacker_old_hp, self.attacker_new_hp,
                                            self.attacker_old_armour, self.attacker_new_armour)

        self.defender_id = 2

        self.defender_old_hp = 100
        self.defender_new_hp = 100
        self.defender_old_armour = 0
        self.defender_new_armour = 50

        self.defender_change = PlayerChange(self.defender_id,
                                            self.defender_old_hp, self.defender_new_hp,
                                            self.defender_old_armour, self.defender_new_armour)

    def test_create(self):
        players_changes = PlayersChanges(self.attacker_change, self.defender_change)

        self.assertIs(players_changes.attacker_change, self.attacker_change)
        self.assertIs(players_changes.defender_change, self.defender_change)
