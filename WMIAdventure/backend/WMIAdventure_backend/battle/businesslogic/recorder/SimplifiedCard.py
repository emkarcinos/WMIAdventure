from battle.businesslogic.BattleCard import BattleCard
from cards.models import CardEffect


class SimplifiedCard:
    """
    Stores some information about card, used to record battle.
    """

    has_buffs: bool
    card_id: int
    effects_ids: list[
        CardEffect.EffectId]  # TODO: jeśli chodziło o to, jakie karta ma efekty to zostawić jak jest. Jeśli chodziło o to, żeby frontend wiedział, jakie efekety zostały wykonane w danej turze to zmienić pole na used_effects i dodać do konstruktora.

    def __init__(self, card: BattleCard):
        self.card_id = card.card_model.id
        self.effects_ids = [effect.effect_model.card_effect.id for effect in card.effects]
        self.has_buffs = False
        self._check_if_card_buffed(card)

    def _check_if_card_buffed(self, card: BattleCard) -> None:
        for effect in card.effects:
            if len(effect.buffs) > 0:
                self.has_buffs = True
                break
