from battle.businesslogic.card_states.BlockedCardState import BlockedCardState
from battle.businesslogic.effects.Effect import Effect
from cards.models import CardLevelEffects


class BlockCardEffect(Effect):
    """
    Blocks card for given amount of turns.
    """

    def __init__(self, effect_model: CardLevelEffects, turns_blocked: int = 1):
        super().__init__(effect_model)
        self.turns_blocked = turns_blocked

    def on_activation(self, target, turns_queue):
        """
        Blocks card by adding BlockedCardState to it.
        :param target: Target player.
        :param turns_queue:
        :return: None.
        """

        card = target.deck.lookup()
        card.add_state(BlockedCardState(self.turns_blocked))
