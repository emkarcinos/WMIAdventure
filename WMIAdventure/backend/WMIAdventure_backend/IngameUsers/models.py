from db_file_storage.model_utils import delete_file_if_needed, delete_file
from django.conf import settings
from django.db import models
from django.db.models.functions import Upper

from cards.models import Card
# Create your models here.
from cards.validators import validate_file_size


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

    class Meta:
        ordering = [Upper('displayedUsername')]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        help_text="A reference to Django user model"
    )
    displayedUsername = models.CharField(max_length=50, help_text="Pretty username available to anyone")
    image = models.FileField(null=True,
                             blank=True,
                             help_text="# Player profile image",
                             upload_to='IngameUsers.ImageStorage/bytes/filename/mimetype',
                             validators=[validate_file_size])
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True, help_text="Semester number.")

    def __str__(self):
        return self.displayedUsername

    def save(self, *args, **kwargs):
        delete_file_if_needed(self, 'image')
        super(UserProfile, self).save(*args, **kwargs)
        
    def delete(self, *args, **kwargs):
        super(UserProfile, self).delete(*args, **kwargs)
        delete_file(self, 'image')

class UserCard(models.Model):
    """
    Model storing information about ownership of concrete card.
    """

    user_profile = models.ForeignKey(UserProfile, related_name='user_cards', on_delete=models.CASCADE)
    card = models.ForeignKey(Card, related_name='user_card_records', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_profile', 'card'],
                                    name='user_card_composite_pk')
        ]


class Deck(models.Model):
    """
    Ordered deck of cards.
    """

    card1 = models.ForeignKey(UserCard, related_name='deck_card1', on_delete=models.CASCADE)
    card2 = models.ForeignKey(UserCard, related_name='deck_card2', on_delete=models.CASCADE)
    card3 = models.ForeignKey(UserCard, related_name='deck_card3', on_delete=models.CASCADE)
    card4 = models.ForeignKey(UserCard, related_name='deck_card4', on_delete=models.CASCADE)
    card5 = models.ForeignKey(UserCard, related_name='deck_card5', on_delete=models.CASCADE)


class UserDeck(models.Model):
    deck_number = models.PositiveIntegerField()
    deck = models.OneToOneField(Deck, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, related_name='user_decks', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['deck_number', 'deck', 'user_profile'],
                                    name='user_deck_composite_pk')
        ]


class ImageStorage(models.Model):
    bytes = models.BinaryField()
    filename = models.CharField(max_length=255)
    mimetype = models.CharField(max_length=50)
