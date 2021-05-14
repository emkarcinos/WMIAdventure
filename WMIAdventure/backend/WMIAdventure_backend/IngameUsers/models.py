from django.conf import settings
from django.db import models

from cards.models import Card


# Create your models here.


class Semester(models.Model):
    """
    Semester tells us how far has the user progressed in their education IRL.
    This class may seem redundant for now, but if we ever need to know more about a semester, this is a good place
    to implement.
    """

    semesterNumber = models.IntegerField(primary_key=True)


class UserProfile(models.Model):
    """
    Handy information about a given in-app user.
    Stores non-vital data just to make a user appear pretty.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True
    )
    displayedUsername = models.CharField(max_length=50)
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.displayedUsername


class UserCard(models.Model):
    """
    Model storing information about ownership of concrete card.
    """

    user_profile = models.ForeignKey(UserProfile, related_name='cards', on_delete=models.CASCADE)
    card = models.ForeignKey(Card, related_name='user_profile', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_profile', 'card'],
                                    name='user_card_composite_pk')
        ]


class Deck(models.Model):
    """
    Ordered deck of cards.
    """

    card1 = models.ForeignKey(UserCard, on_delete=models.CASCADE)
    card2 = models.ForeignKey(UserCard, on_delete=models.CASCADE)
    card3 = models.ForeignKey(UserCard, on_delete=models.CASCADE)
    card4 = models.ForeignKey(UserCard, on_delete=models.CASCADE)
    card5 = models.ForeignKey(UserCard, on_delete=models.CASCADE)


class UserDeck(models.Model):
    deck_number = models.PositiveIntegerField()
    deck = models.OneToOneField(Deck, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, related_name='deck', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['deck_number', 'deck', 'user_profile'],
                                    name='user_deck_composite_pk')
        ]
