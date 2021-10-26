import os

from django.core.files import File

from IngameUsers.models import UserProfile, UserCard, Deck, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect


def get_or_create_example_card(name, tooltip, subject) -> Card:
    info, _ = CardInfo.objects.get_or_create(
        name=name,
        defaults={
            'name': name,
            'tooltip': tooltip,
            'image': None,
            'subject': subject
        }
    )

    level = CardLevel.objects.get(pk=CardLevel.Level.COMMON)
    card, _ = Card.objects.get_or_create(info=info,
                                         level=level)
    effect = CardEffect.objects.get(pk=CardEffect.EffectId.DMG)
    CardLevelEffects.objects.get_or_create(card=card,
                                           card_effect=effect,
                                           target=CardLevelEffects.Target(1),
                                           power=15,
                                           range=2)

    return card


def get_or_create_example_deck_for_user(user: UserProfile):
    card1 = get_or_create_example_card("Przykład 1", "1", "Programowanie Obiektowe")
    card2 = get_or_create_example_card("Przykład 2", "2", "Programowanie Obiektowe")
    card3 = get_or_create_example_card("Przykład 3", "3", "Programowanie Obiektowe")
    card4 = get_or_create_example_card("Przykład 4", "4", "Programowanie Obiektowe")
    card5 = get_or_create_example_card("Przykład 5", "5", "Programowanie Obiektowe")

    user_card1 = UserCard.objects.create(user_profile=user,
                                         card=card1)
    user_card2 = UserCard.objects.create(user_profile=user,
                                         card=card2)
    user_card3 = UserCard.objects.create(user_profile=user,
                                         card=card3)
    user_card4 = UserCard.objects.create(user_profile=user,
                                         card=card4)
    user_card5 = UserCard.objects.create(user_profile=user,
                                         card=card5)

    deck = Deck.objects.create(card1=user_card1,
                               card2=user_card2,
                               card3=user_card3,
                               card4=user_card4,
                               card5=user_card5)

    deck2 = Deck.objects.create(card1=user_card5,
                                card2=user_card4,
                                card3=user_card3,
                                card4=user_card2,
                                card5=user_card1)

    UserDeck.objects.create(deck_number=1,
                            deck=deck,
                            user_profile=user)
    UserDeck.objects.create(deck_number=2,
                            deck=deck2,
                            user_profile=user)
