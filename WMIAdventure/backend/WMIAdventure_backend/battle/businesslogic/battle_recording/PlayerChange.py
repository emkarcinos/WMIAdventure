

class PlayerChange:
    def __init__(self, player_id, old_hp, new_hp, old_armour, new_armour):
        self.player_id = player_id
        self.hp = self.__calculate_hp_change__(old_hp, new_hp)
        self.armour = self.__calculate_armour_change__(old_armour, new_armour)
        self.defeated = None
        self.deck = None

    def __calculate_hp_change__(self, old_hp, new_hp):
        if old_hp != new_hp:
            return new_hp - old_hp
        return None

    def __calculate_armour_change__(self, old_armour, new_armour):
        if old_armour != new_armour:
            return new_armour - old_armour
        return None
