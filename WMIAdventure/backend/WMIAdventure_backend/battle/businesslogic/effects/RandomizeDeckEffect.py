from battle.businesslogic.effects.Effect import Effect
import random


class RandomizeDeckEffect(Effect):
    """
    Randomizes order of cards in deck.
    """

    def on_activation(self, target, turns_queue):
        deck = target.deck

        cards_order = [None for _ in range(deck.size())]
        for i in range(deck.size()):
            cards_order[i] = deck.lookup(i)

        random.shuffle(cards_order)
        deck.create_cards_queue(tuple(cards_order))
