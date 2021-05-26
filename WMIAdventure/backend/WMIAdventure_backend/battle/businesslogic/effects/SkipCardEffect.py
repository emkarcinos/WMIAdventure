from battle.businesslogic.Player import Player
from battle.businesslogic.effects.Effect import Effect


class SkipCardEffect(Effect):
    def on_activation(self, target: Player, turns_queue):
        # To skip a card, we simply need to dequeue it using Deck's custom queue.
        target.deck.get_card()