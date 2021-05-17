from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.CardBuff import CardBuff
from cards.models import CardEffect


class BuffMediator:
    """
    Mediator class responsible for assigning buffs to appropriate effect instances.
    """

    @staticmethod
    def assign_buff(buff: CardBuff, card: BattleCard, effect_type: CardEffect.EffectId):
        """
        This method assigns a buff to some card's appropriate effects.
        @param: buff - Buff instance ready to get assigned
        @param: card - Card instance with effects to have buffs applied
        @param: effect_type - Enum that will determine which effect will be boosted
        """
        for effect in card.effects:
            # We check if any of the effects if of the type specified in the parameter
            if effect.effect_model.card_effect.EffectId is effect_type:
                effect.add_buff(buff)
