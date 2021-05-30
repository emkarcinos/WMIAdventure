from typing import Any


class CardState:
    """
    This is abstract class of card's state. Concrete card state classes should derive from this class.
    Card can have states like being blocked.
    """
    turns_active: int
    active: bool

    def __init__(self, turns_active: int = 1):
        """
        Creates CardState instance.
        :param turns_active: How many turns will this state last..
        """

        self.turns_active = turns_active
        self.active = True

    def on_card_use(self, effects_to_use: list[Any]):
        """
        Card state logic should be put here by overriding this method in concrete card state subclass.
        :param effects_to_use: List of effects to be used in battle simulation.
        :return: None.
        """

        pass

    def update(self):
        """
        Updates state, should be called every turn.
        :return: None
        """

        self.turns_active -= max(0, self.turns_active - 1)
        if self.turns_active <= 0:
            self.active = False
