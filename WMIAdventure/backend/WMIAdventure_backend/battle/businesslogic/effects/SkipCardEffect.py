from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.recorder.effects_impacts.DeckOrderChangedEffectImpact import DeckOrderChangedEffectImpact


class SkipCardEffect(Effect):
    def on_activation(self, target, turns_queue):
        # To skip a card, we simply need to dequeue it using Deck's custom queue.
        target.deck._dequeue_card()

        return DeckOrderChangedEffectImpact(self.effect_model.card_effect.id, target.id, target.deck)

    def description(self) -> str:
        return f"Pomija działanie następnej karty {self.target.label}a"
