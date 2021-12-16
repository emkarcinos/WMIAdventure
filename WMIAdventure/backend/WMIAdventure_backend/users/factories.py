import factory
from django.utils import timezone
from factory.django import DjangoModelFactory

from users import signals


@factory.django.mute_signals(signals.user_registered)
class UserFactory(DjangoModelFactory):
    """
    Creates User.
    """

    class Meta:
        model = "users.User"

    username = factory.Faker('user_name')
    date_joined = factory.LazyFunction(timezone.now)

    is_staff = False
    is_active = True
