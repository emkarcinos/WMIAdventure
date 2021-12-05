import random

from IngameUsers.models import UserProfile, Semester
from WMIAdventure_backend import settings
from users.models import User
from users.signals import user_registered
from users.views import UserRegister
from utils.test_data.create_example_data import get_or_create_example_deck_for_user


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

        get_or_create_example_deck_for_user(user_profile)


user_registered.connect(on_user_create, sender=UserRegister, dispatch_uid="on_user_create")
