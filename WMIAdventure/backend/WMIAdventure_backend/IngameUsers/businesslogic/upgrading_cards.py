from typing import Optional

from django.db import transaction
from django.db.models import Max

from IngameUsers.businesslogic.exceptions import CannotUpgradeCardException
from IngameUsers.models import UserCard, UserStats
from cards.models import Card


def upgrade_card(user_card: UserCard) -> UserCard:
    """
    Upgrades given user's card.

    :param user_card:
    :return: Upgraded UserCard.
    :raises CannotUpgradeCardException: If upgrading criteria are not met. (see wiki for more info about those criteria)
    """

    _check_next_level_cost(user_card)
    upgraded_card = _get_next_level(user_card.card)
    if upgraded_card is None:
        raise CannotUpgradeCardException("Card has no next level")

    # Lock user's stats and user's card for transaction to prevent race conditions
    user_stats = UserStats.objects.select_for_update().get(pk=user_card.user_profile.user_stats.id)
    old_user_card = UserCard.objects.select_for_update().get(pk=user_card.id)

    # Perform card upgrade
    with transaction.atomic():
        user_stats.skill_points -= user_card.card.next_level_cost
        user_stats.save()
        old_user_card.delete()
        upgraded_user_card = UserCard.objects.create(user_profile=user_stats.profile, card=upgraded_card)

    return upgraded_user_card


def _check_next_level_cost(user_card: UserCard):
    """

    :param user_card:
    :raises CannotUpgradeCardException: If card has no next level cost or user has not enough skill points.
    """

    owned_level = user_card.card

    if owned_level.next_level_cost is None:
        raise CannotUpgradeCardException("Card has no next level cost")
    user_stats = user_card.user_profile.user_stats
    if user_stats.skill_points < owned_level.next_level_cost:
        raise CannotUpgradeCardException("User does not have enough skill points to upgrade card")


def _get_next_level(current_level: Card) -> Optional[Card]:
    """
    Retrieves Card at next level.

    :param current_level:
    :return: Card object which is at next level or None if there is no next level.
    """

    card_info = current_level.info
    max_level = card_info.levels.aggregate(Max('level'))['level__max']

    next_level = None
    for level_value in range(current_level.level.level, max_level):
        try:
            next_level = card_info.levels.get(level=level_value + 1)
            break
        except Card.DoesNotExist:
            continue

    return next_level
