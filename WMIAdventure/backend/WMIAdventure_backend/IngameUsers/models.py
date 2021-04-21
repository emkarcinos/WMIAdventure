from django.db import models


# Create your models here.


class Semester(models.Model):
    """
    Semester tells us how far has the user progressed in their education IRL.
    This class may seem redundant for now, but if we ever need to know more about a semester, this is a good place
    to implement.
    """

    semesterNumber = models.IntegerField(primary_key=True)


class BasicUserInfo(models.Model):
    """
    Handy information about a given in-app user.
    Stores non-vital data just to make a user appear pretty.
    """

    username = models.CharField(max_length=50, primary_key=True)
    semester = models.OneToOneField(Semester, on_delete=models.SET_NULL)

    def __str__(self):
        return self.username
