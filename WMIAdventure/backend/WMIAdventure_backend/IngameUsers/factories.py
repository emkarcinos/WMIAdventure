import random
from typing import Optional

import factory
from factory.django import DjangoModelFactory

from IngameUsers import signals
from IngameUsers.models import Semester, UserCard, UserProfile, Deck
from cards.factories import create_card_with_effect
from cards.models import Card
from users.factories import UserFactory


class UserStatsFactory(DjangoModelFactory):
    exp = 0

    class Meta:
        model = 'IngameUsers.UserStats'


@factory.django.mute_signals(signals.user_registered)
class UserProfileFactory(DjangoModelFactory):
    """
    Creates User and his UserProfile with UserStats.
    """

    class Meta:
        model = 'IngameUsers.UserProfile'

    displayedUsername = factory.Faker('user_name')

    semester = factory.LazyAttribute(lambda obj: random.choice(Semester.objects.all()))

    user = factory.SubFactory(UserFactory)
    user_stats = factory.RelatedFactory(UserStatsFactory, factory_related_name='profile')


def create_deck_from_user_cards(user_cards: tuple[UserCard, UserCard, UserCard, UserCard, UserCard]):
    """
    Creates deck from given tuple of UserCards.

    :param user_cards: Order of cards in tuple has meaning - first card in tuple will be the first in the deck, etc.
    :return: Created deck.
    """

    assert len(user_cards) == 5, "You should provide 5 user cards."
    deck = Deck.objects.create(
        card1=user_cards[0],
        card2=user_cards[1],
        card3=user_cards[2],
        card4=user_cards[3],
        card5=user_cards[4]
    )

    return deck


def create_deck_for_user(
        user_profile: UserProfile,
        card1: Optional[Card] = None,
        card2: Optional[Card] = None,
        card3: Optional[Card] = None,
        card4: Optional[Card] = None,
        card5: Optional[Card] = None
):
    """
    Creates deck which given user will own.

    If any card is not provided then default card will be created (dealing damage to opponent).

    :param user_profile: Owner of the deck.
    :param card1:
    :param card2:
    :param card3:
    :param card4:
    :param card5:
    :return: Created deck.
    """

    card1 = create_card_with_effect() if card1 is None else card1
    card2 = create_card_with_effect() if card2 is None else card2
    card3 = create_card_with_effect() if card3 is None else card3
    card4 = create_card_with_effect() if card4 is None else card4
    card5 = create_card_with_effect() if card5 is None else card5

    cards = [card1, card2, card3, card4, card5]
    user_cards = [UserCard.objects.create(user_profile=user_profile, card=card) for card in cards]

    deck = create_deck_from_user_cards(tuple(user_cards))

    deck_number = user_profile.user_decks.all().count() + 1
    user_profile.user_decks.create(deck=deck, deck_number=deck_number)

    return deck


def create_user_profile_with_deck(
        card1: Optional[Card] = None,
        card2: Optional[Card] = None,
        card3: Optional[Card] = None,
        card4: Optional[Card] = None,
        card5: Optional[Card] = None
) -> tuple[UserProfile, Deck]:
    """
    Creates user with deck which contains given cards.

    If any card is not provided then by default basic dealing damage card will be created.

    :param card1:
    :param card2:
    :param card3:
    :param card4:
    :param card5:
    :return: User profile and his deck.
    """

    user_profile = UserProfileFactory()

    deck = create_deck_for_user(
        user_profile,
        card1,
        card2,
        card3,
        card4,
        card5
    )

    return user_profile, deck
