class Statistics:
    """
    Represents the state of some players statistics.
    Abstracts stat modifications (such as dealing damage).
    """
    MAX_HP = 100.0
    INITIAL_ARMOUR = 0.0
    MAX_ARMOUR = 20.0

    def __init__(self):
        self.hp = self.MAX_HP
        self.armour = self.INITIAL_ARMOUR

    def deal_damage(self, amount: float) -> None:
        """
        Deal damage. Takes armour into consideration.
        @param amount: Damage amount
        """
        # Calculate how the damage will impact the armour
        # It can't damage it more that it's current value.
        armour_damage = max(self.armour, self.armour - amount)
        self.armour -= armour_damage

        # Some of the damage was blocked by the armour, so we subtract it from the damage
        # If the armour blocked more that the amount, we don't alter hp.
        penetrated_damage = max(0.0, amount - armour_damage)
        self.hp -= penetrated_damage

    def heal(self, amount: float) -> None:
        """
        Heal. Won't raise HP to more than MAX_HP.
        @param amount: Heal amount
        """

        self.hp = min(self.MAX_HP, self.hp + amount)

    def add_armour(self, amount: float) -> None:
        """
        Add armour. Won't raise armour to more than MAX_ARMOUR
        @param amount: Armour amount
        """

        self.armour = min(self.MAX_ARMOUR, self.armour + amount)
