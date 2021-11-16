from typing import Optional

import factory

from IngameUsers.factories import create_user_profile_with_deck
from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.buffs.ModifierBuff import ModifierBuff
from cards.factories import create_card_with_effect
from cards.models import Card, CardEffect, CardLevelEffects, CardLevel


class BuffFactory(factory.Factory):
    class Meta:
        model = ModifierBuff

    multiplier = 1
    modifier = factory.Faker('random_int', min=1, max=20)
    buff_type = None
    active_turns = 1
    activation_delay_turns = 0


def create_player_with_deck(
        card1: Optional[Card] = None,
        card2: Optional[Card] = None,
        card3: Optional[Card] = None,
        card4: Optional[Card] = None,
        card5: Optional[Card] = None
) -> tuple[Player, Deck]:
    """
    Creates player with deck created from given cards.

    :param card1:
    :param card2:
    :param card3:
    :param card4:
    :param card5:
    :return: Created player with his deck.
    """

    user_p, deck_model = create_user_profile_with_deck(
        card1,
        card2,
        card3,
        card4,
        card5
    )

    deck = Deck(deck_model)
    return Player(user_p.user.id, deck), deck


def create_player() -> Player:
    """
    Creates player, his deck will consist of default dmg dealing cards.
    :return: Created player.
    """

    player, _ = create_player_with_deck()
    return player


def create_battle_card_with_effect(
        effect_id: CardEffect.EffectId,
        target: CardLevelEffects.Target = CardLevelEffects.Target.PLAYER,
        level: CardLevel.Level = CardLevel.Level.COMMON,
        power: int = 10,
        range_: float = 5
) -> BattleCard:
    """
    Creates BattleCard with given effect.

    :param effect_id:
    :param target:
    :param level:
    :param power:
    :param range_:
    :return: Created BattleCard.
    """

    card_model = create_card_with_effect(
        effect_id,
        target,
        level,
        power,
        range_
    )

    return BattleCard(card_model)
