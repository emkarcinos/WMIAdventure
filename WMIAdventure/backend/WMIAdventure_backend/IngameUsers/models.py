from django.db import models
from django.conf import settings


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
