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
        COMMON = 1, _("Typowa")
        RARE = 2, _("Złota")
        EPIC = 3, _("Epicka")

    level = models.IntegerField(primary_key=True, choices=Level.choices, default=Level.COMMON)

    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not isinstance(self.level, CardLevel.Level):
            self.level = CardLevel.Level(self.level)
        self.name = self.level.label

        super(CardLevel, self).save(*args, **kwargs)


class CardEffect(models.Model):
    """
    Represents a card effect, contains it's identifier, name and displayed tooltip.
    """

    class EffectId(models.IntegerChoices):
        """
        All possible effects
        """
        DMG = 1, _("Zadawanie obrażeń")
        SHIELD = 2, _("Tarcza")
        SWAP_RND = 3, _("Losowa zamiana kolejności kart")
        STOP = 4, _("Zatrzymanie na jedną turę")
        DOUBLEACTION = 5, _("Dwukrotne wykonanie się karty")
        HEAL = 6, _("Leczenie")
        BLOCK = 7, _("Blokowanie następnej karty")
        EMPOWER = 8, _("Zwiększenie mocy następnej karty")
        SKIP = 9, _("Pomijanie następnej karty")

    id = models.IntegerField(primary_key=True, choices=EffectId.choices, default=EffectId.DMG)
    name = models.CharField(max_length=50)
    tooltip = models.TextField(max_length=150, null=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not isinstance(self.id, CardEffect.EffectId):
            self.effect = CardEffect.EffectId(self.id)
        self.name = self.effect.label

        super(CardEffect, self).save(*args, **kwargs)


class CardInfo(models.Model):
    """
    Stores generic information about Card.
    """

    name = models.CharField(max_length=50)
    tooltip = models.TextField()
    image = models.ImageField(upload_to='cards/images/', blank=True)


class Card(models.Model):
    """
    This may be understood as coupling CardInfo with appropriate levels,
    that is, if we create a CardInfo model, we create multiple Cards depending on how many levels the Card may have.
    """
    info = models.ForeignKey(CardInfo, unique=False, on_delete=models.CASCADE)
    level = models.ForeignKey(CardLevel, unique=False, on_delete=models.CASCADE)
    next_level_cost = models.IntegerField(null=True)

    class Meta:
        """
        This makes (info, level) unique
        """
        constraints = [
            models.UniqueConstraint(fields=['info', 'level'],
                                    name='unique_info_level')
        ]


class CardLevelEffects(models.Model):
    """
    This is like an extended many-to-many relation in databases.
    Couples Card objects with its effects.
    """

    class Target(models.IntegerChoices):
        """
        Possible targets.
        """
        PLAYER = 1
        OPPONENT = 2

    card = models.ForeignKey(Card, unique=False, on_delete=models.CASCADE)
    card_effect = models.ForeignKey(CardEffect, unique=False, on_delete=models.CASCADE)
    # This isn't unique even as a pair with card, as a single card on a given level '
    # may have multiple of the same effect.
    target = models.IntegerField(choices=Target.choices, default=Target.OPPONENT)
    power = models.IntegerField(null=True)
    # Range defines how the power attribute will vary in card logic.
    # So an actual power will be randomized from range (power - range, power + range)
    range = models.FloatField(null=True)
