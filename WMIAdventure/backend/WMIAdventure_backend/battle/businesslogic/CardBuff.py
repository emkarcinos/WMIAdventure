from battle.businesslogic.BattleCard import BattleCard


class CardBuff:
    """
    Abstract class to be derived when creating concrete card buffs classes.
    """

    turns_active: int

    def __init__(self, turns_active: int, attached_to: BattleCard):
        self.turns_active = turns_active
        self.attached_to = attached_to
        self.active = False
        self._buff_attached()

    def _buff_attached(self):
        """
        Is called when buff is attached to the card.
        """

        pass

    def _deactivate(self):
        """
        Deactivates buff and restores card to previous state, before this buff was applied.
        """

        self.active = False
        self._restore_card_to_previous_state()

    def _restore_card_to_previous_state(self):
        """
        Restores card to state before this buff was applied.
        """

        pass  # TODO : Implement when some concrete buffs will be implemented.

    def update(self):
        """
        Is called every turn of card that this buff is attached to.
        Updates buff:
        - when buff time has passed deactivates - it by bringing card to previous state
        - activates card if it should have some delay before activated
        - ...
        """

        self.turns_active -= 1
        if self.turns_active <= 0:
            self._deactivate()
