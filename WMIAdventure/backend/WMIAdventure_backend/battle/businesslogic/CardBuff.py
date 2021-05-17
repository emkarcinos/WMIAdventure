class CardBuff:

    def __init__(self,
                 attack_multiplier=0.0,
                 attack_modifier=0.0,
                 heal_multiplier=0.0,
                 heal_modifier=0.0,
                 shield_multiplier=0.0,
                 shield_modifier=0.0,
                 active_turns=1,
                 activation_delay_turns=0):
        """
        Creates a buff.
        Buffs can have a set expiration date, and they can activate themselves after specified amount of turns.
        @param attack_multiplier: A factor by which the attack will get multiplied
        @param attack_modifier: An amount which will get added to the attack value
        @param heal_multiplier: A factor by which the heal will get multiplied
        @param heal_modifier: An amount which will get added to the heal value
        @param shield_multiplier: A factor by which the shield will get multiplied
        @param shield_modifier: An amount which will get added to the shield value
        @param active_turns: Number of turns this buff will last
        @param activation_delay_turns: Number of turns before this buff activates.
        """
        self.attack_multiplier = attack_multiplier
        self.attack_modifier = attack_modifier
        self.heal_multiplier = heal_multiplier
        self.heal_modifier = heal_modifier
        self.shield_multiplier = shield_multiplier
        self.shield_modifier = shield_modifier
        self.turns_remaining = active_turns
        self.sleep_remaining = activation_delay_turns

    def tick(self):
        """
        Updates this buff timers.
        """

        # We don't allow the values go negative
        self.turns_remaining = max(0, self.turns_remaining - 1)
        self.sleep_remaining = max(0, self.sleep_remaining - 1)

    def is_expired(self):
        return self.turns_remaining > 0

    def can_trigger(self):
        """
        Checks whether this buff can trigger.
        """
        if self.sleep_remaining == 0 and self.is_expired():
            return True
        return False

    def update(self):
        """
        This method updates the buff state.
        It should be called each turn before the card's effects execution.
        """
        self.tick()
