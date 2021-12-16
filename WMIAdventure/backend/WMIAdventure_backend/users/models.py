from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom User class."""

    email = None
    first_name = None
    last_name = None
