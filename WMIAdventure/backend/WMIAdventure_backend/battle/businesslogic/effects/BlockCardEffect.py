from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.recorder.effects_impacts.CardBlockedEffectImpact import CardBlockedEffectImpact
from cards.models import CardLevelEffects


class BlockCardEffect(Effect):
    def __init__(self, effect_model: CardLevelEffects, turns: int = 1):
        """
        Blocks card which is first in turn to be executed for given amount of turns.
        :param effect_model:
        :param turns: How many turns should card be blocked.
        """

        super().__init__(effect_model)
        self.turns = turns

    def on_activation(self, target, turns_queue):
        """
        Blocks card which is first in turn to be executed.
        :param target: Target who will get his card blocked.
        :param turns_queue:
        :return: CardBlockedEffectImpact.
        """

        blocked_card = target.deck.lookup()
        blocked_card.turns_blocked += self.turns
        return CardBlockedEffectImpact(self.effect_model.card_effect.id, target.id, self.turns, blocked_card)

    def description(self) -> str:
        return f"Blokuje działanie następnej karty {self.target.label}a"
