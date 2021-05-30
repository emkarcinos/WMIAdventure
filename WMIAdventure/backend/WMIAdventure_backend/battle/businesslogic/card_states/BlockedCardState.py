from typing import Any

from battle.businesslogic.card_states.CardState import CardState


class BlockedCardState(CardState):
    """
    Blocks card from being used by removing it's effects.
    """

    def on_card_use(self, effects_to_use: list[Any]):
        """
        Blocks card by clearing effects list.
        :param effects_to_use: List of effects to be used in battle simulation.
        :return: None.
        """

        effects_to_use.clear()
