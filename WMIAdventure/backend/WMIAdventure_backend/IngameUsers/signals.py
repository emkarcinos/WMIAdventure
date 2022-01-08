import random

from django.db.models import F, Q, Min

from IngameUsers.businesslogic.experience.Experience import Experience
from IngameUsers.businesslogic.skill_points import calculate_skill_points_gain
from IngameUsers.models import UserProfile, Semester, UserStats, UserCard
from WMIAdventure_backend import settings
from cards.models import CardInfo
from users.models import User
from users.signals import user_registered
from users.views import UserRegister
from utils.test_data.create_example_data import get_or_create_example_deck_for_user


def _give_all_not_owned_cards_to_user(user_profile) -> int:
    """
    Gives all cards with minimal level to user if he doesn't own them.

    TODO: REMOVE THIS IN THE FUTURE. For now all users should have all cards. This function will be removed when
     there will be some way of gaining cards implemented.

    :return: How many cards were given to user.
    """

    owned_infos = user_profile.user_cards.annotate(info=F('card__info')).values_list('info', flat=True)

    # If user is not owner of all cards then give him those missing cards with minimal level
    if owned_infos.count() < CardInfo.objects.count():
        not_owned_infos = CardInfo.objects.filter(~Q(pk__in=owned_infos))
        cards_to_give = []
        for card_info in not_owned_infos:
            # Retrieving Card related to CardInfo with minimal level
            min_level = card_info.levels.aggregate(Min('level'))['level__min']
            cards_to_give.append(card_info.levels.get(level=min_level))

        new_user_cards = [UserCard(user_profile=user_profile, card=card) for card in cards_to_give]
        UserCard.objects.bulk_create(new_user_cards)
        return len(cards_to_give)

    return 0


def user_gained_exp(user_stats: UserStats, level_before: int, level_after: int) -> None:
    """
    This function is called after user gained exp.

    :param user_stats:
    :param level_before: Level before exp gain.
    :param level_after: Level after exp gain.
    """

    user_stats.skill_points += calculate_skill_points_gain(level_before, level_after)
    user_stats.save()


def user_should_gain_exp(user_stats: UserStats, exp_amount: int):
    """
    Gives exp to player.
    """

    level_before = Experience(user_stats.exp).level

    user_stats.exp += exp_amount
    user_stats.save()

    level_after = Experience(user_stats.exp).level
    user_gained_exp(user_stats, level_before, level_after)


def on_user_create(sender, user: settings.AUTH_USER_MODEL, **kwargs):
    """
    Creates a user profile whenever new user has been created.
    """

    user: User = User.objects.get(pk=user.id)

    # TODO: Users should get their semester from USOS service in the future
    try:
        UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        rnd = random.randint(1, 7)
        semester = Semester.objects.get(pk=rnd)
        user_profile = UserProfile.objects.create(user=user,
                                                  displayedUsername=user.username,
                                                  semester=semester)
        UserStats.objects.create(profile=user_profile, exp=0)
        get_or_create_example_deck_for_user(user_profile)

        # TODO: Remove this when gaining cards is implemented
        _give_all_not_owned_cards_to_user(user_profile)


user_registered.connect(on_user_create, sender=UserRegister, dispatch_uid="on_user_create")
