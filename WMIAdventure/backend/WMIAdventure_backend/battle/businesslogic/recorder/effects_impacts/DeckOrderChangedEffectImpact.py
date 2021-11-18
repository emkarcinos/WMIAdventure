from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact


class DeckOrderChangedEffectImpact(EffectImpact):
    """
    Holds information about used effect, who was target
    and stores target's deck which has order changed by activation of this effect.
    """

    def __init__(self, effect_id: int, target_player_id: int, target_deck):
        super().__init__(effect_id, target_player_id)
        self.reordered_deck = (battle_card.card_model.info.id for battle_card in list(target_deck.cards_queue))
        """Reordered deck contains ids of cards"""
