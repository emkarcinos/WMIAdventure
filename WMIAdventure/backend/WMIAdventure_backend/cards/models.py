from django.core.validators import MinValueValidator, MaxValueValidator
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
        COMMON = 1, _("Typowa"),
        RARE = 2, _("Rzadka"),
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
        EMPOWER_DMG = 10, _("Zwiększenie obrażeń następnej karty")
        EMPOWER_SHIELD = 11, _("Zwiększenie mocy tarczy następnej karty")
        EMPOWER_HEAL = 12, _("Zwiększenie mocy leczenia następnej karty")
        TRUE_DMG = 13, _("Obrażenia nieuchronne")

    id = models.IntegerField(primary_key=True, choices=EffectId.choices, default=EffectId.DMG)
    name = models.CharField(max_length=50, help_text="A pretty effect name on-display.")
    tooltip = models.TextField(max_length=150, null=True, help_text="Effect description")

    has_modifier = models.BooleanField(default=False, help_text="# This field tells us whether a specific effect can "
                                                                "have modifiers (power, range, etc). Most of the "
                                                                "effect have no such modifiers, so I set the default "
                                                                "to be False.")

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

    name = models.CharField(max_length=50, unique=True, help_text="Displayed card's name. Must be unique.")
    tooltip = models.TextField(help_text="Card's description. Gets displayed together with the card as a tooltip.")
    image = models.ImageField(upload_to='cards/images/', null=True, blank=True, help_text="An image. We don't really"
                                                                                          "know what should that be.")
    subject = models.CharField(max_length=50, null=True, help_text="Subject name. In the future this field will be an"
                                                                   " id pointing to Subject object.")


class Card(models.Model):
    """
    This may be understood as coupling CardInfo with appropriate levels,
    that is, if we create a CardInfo model, we create multiple Cards depending on how many levels the Card may have.
    """
    info = models.ForeignKey(CardInfo, related_name='levels', unique=False, on_delete=models.CASCADE)
    level = models.ForeignKey(CardLevel, unique=False, on_delete=models.CASCADE)
    next_level_cost = models.IntegerField(null=True, validators=[MinValueValidator(0),
                                                                 MaxValueValidator(100)])

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

    card = models.ForeignKey(Card, related_name='effects', unique=False, on_delete=models.CASCADE)
    card_effect = models.ForeignKey(CardEffect, unique=False, on_delete=models.CASCADE)
    # This isn't unique even as a pair with card, as a single card on a given level '
    # may have multiple of the same effect.
    target = models.IntegerField(choices=Target.choices, default=Target.OPPONENT)
    power = models.IntegerField(null=True, validators=[MinValueValidator(0),
                                                       MaxValueValidator(100)])
    # Range defines how the power attribute will vary in card logic.
    # So an actual power will be randomized from range (power - range, power + range)
    range = models.FloatField(null=True, validators=[MinValueValidator(0),
                                                     MaxValueValidator(100)])
