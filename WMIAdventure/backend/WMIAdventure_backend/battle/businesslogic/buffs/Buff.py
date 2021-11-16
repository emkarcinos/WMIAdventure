class Buff:

    def __init__(self,
                 buff_type=None,
                 multiplier=1.0,
                 modifier=0.0,
                 active_turns=1,
                 activation_delay_turns=0):
        """
        Creates a buff.
        Buffs can have an expiration date, and they can activate themselves after specified amount of turns.

        @param buff_type: Id of effect that this buff applies to. Can be None if buff applies to all kinds of effects.
        @param multiplier: A factor by which the statistic will get multiplied
        @param modifier: An amount which will get added to the statistic value
        @param active_turns: Number of turns this buff will last
        @param activation_delay_turns: Number of turns before this buff activates.
        """
        self.multiplier = multiplier
        self.modifier = modifier
        self.turns_remaining = active_turns + 1
        self.sleep_remaining = activation_delay_turns + 1

        self.buff_type = buff_type

    def tick(self):
        """
        Updates this buff timers.
        """

        # We don't allow the values go negative
        self.turns_remaining = max(0, self.turns_remaining - 1)
        self.sleep_remaining = max(0, self.sleep_remaining - 1)

    def is_expired(self):
        return self.turns_remaining == 0

    def can_trigger(self):
        """
        Checks whether this buff can trigger.
        """
        if self.sleep_remaining == 0 and not self.is_expired():
            return True
        return False

    def update(self):
        """
        This method updates the buff state.
        It should be called each turn before the card's effects execution.
        """
        self.tick()
