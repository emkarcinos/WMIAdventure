from battle.businesslogic.effects.Effect import Effect


class SkipCardEffect(Effect):
    def on_activation(self, target, turns_queue):
        # To skip a card, we simply need to dequeue it using Deck's custom queue.
        target.deck.get_card()