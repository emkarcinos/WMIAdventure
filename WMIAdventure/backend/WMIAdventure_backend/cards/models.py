from django.db import models
from django.utils.translation import gettext_lazy as _


class CardLevel(models.Model):
    """
    Card Level.
    """

    class Level(models.IntegerChoices):
        """
        Enum of possible card levels.
        """
        COMMON = 1, _("Common")

    level = models.IntegerField(primary_key=True, choices=Level.choices, default=Level.COMMON)

    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not isinstance(self.level, CardLevel.Level):
            self.level = CardLevel.Level(self.level)
        self.name = self.level.label

        super(CardLevel, self).save(*args, **kwargs)
