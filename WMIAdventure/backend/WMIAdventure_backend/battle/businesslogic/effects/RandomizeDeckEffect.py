import random

from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.recorder.effects_impacts.DeckOrderChangedEffectImpact import DeckOrderChangedEffectImpact


class RandomizeDeckEffect(Effect):
    """
    Randomizes order of cards in deck.
    This effect randomizes cards order til it's changed, there is no randomization which does nothing.
    """

    def on_activation(self, target, turns_queue):
        deck = target.deck

        original_cards_order = [i for i in range(deck.size())]
        new_cards_order = [i for i in range(deck.size())]

        # Randomize cards order til it's changed.
        while new_cards_order == original_cards_order:
            random.shuffle(new_cards_order)

        # Create tuple of BattleCard objects in new order
        cards_in_new_order = tuple([deck.lookup(ind) for ind in new_cards_order])

        deck.create_cards_queue(cards_in_new_order)

        return DeckOrderChangedEffectImpact(self.effect_model.card_effect.id, target.id, deck)

    def description(self) -> str:
        return f"Zamienia losowo kolejność kart {self.target.label}a"
