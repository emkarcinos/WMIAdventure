from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom User class."""

    email = models.EmailField(blank=True, unique=False, max_length=254, verbose_name='email address')
    first_name = None
    last_name = None
