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


def base_card_info_factory(upload_images_to: str):
    """
    This function should be used when you need to derive from abstract BaseCardInfo model class.

    Creates abstract model class of card info with provided place to store images.
    Depending on concrete class that you are creating you may want to store images in different places.

    :param upload_images_to: Place to store card info's images.
    :return: Abstract BaseCardInfo model class.
    """

    class BaseCardInfo(models.Model):
        """
        Stores generic information about card (name, tooltip, etc ...).
        """

        class Meta:
            abstract = True

        name = models.CharField(max_length=50, help_text="Displayed card's name.")
        tooltip = models.TextField(help_text="Card's description. Gets displayed together with the card as a tooltip.")
        image = models.ImageField(upload_to=upload_images_to, null=True, blank=True,
                                  help_text="An image. We don't really"
                                            "know what should that be.")
        subject = models.CharField(max_length=50, null=True,
                                   help_text="Subject name. In the future this field will be an"
                                             " id pointing to Subject object.")

    return BaseCardInfo


class CardInfo(base_card_info_factory('cards/images/')):
    """
    Stores generic information about Card.

    See: BaseCardInfo which is inner class in base_card_info_factory function.
    """

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name'], name='unique_CardInfo_name')
        ]


def base_card_factory(related_card_info_class: type):
    """
    This function should be used when you need to derive from abstract BaseCard model class.

    Creates abstract model class of card with provided related card info class.
    Depending on concrete card model class that you are creating you may want to reference different
    card info model classes.

    :param related_card_info_class: Card info class that this BaseCard class will be related to.
    :return: Abstract BaseCard model class related to given card info class.
    """

    class BaseCard(models.Model):
        """
        This may be understood as coupling card's basic info (like name, tooltip) with appropriate levels,
        that is, if we create a card's info model, we create multiple cards depending on how many levels the card
        may have.
        """

        info = models.ForeignKey(related_card_info_class, related_name='levels', unique=False, on_delete=models.CASCADE)
        effects_description = models.CharField(max_length=100, help_text="A brief description of this level's effects.",
                                               null=True, default="description")
        level = models.ForeignKey(CardLevel, unique=False, on_delete=models.CASCADE)
        next_level_cost = models.IntegerField(null=True, validators=[MinValueValidator(0),
                                                                     MaxValueValidator(100)])

        class Meta:
            abstract = True

            """
            This makes (info, level) unique
            """
            constraints = [
                models.UniqueConstraint(fields=['info', 'level'],
                                        name=f'unique_{related_card_info_class.__name__}_level')
            ]

    return BaseCard


class Card(base_card_factory(CardInfo)):
    """
    This may be understood as coupling CardInfo with appropriate levels,
    that is, if we create a CardInfo model, we create multiple Cards depending on how many levels the Card may have.

    See: BaseCard which is inner class in base_card_factory function.
    """

    pass


def base_card_level_effects_factory(foreignkey_card_cls: type):
    """
    This function should be used when you need to derive from abstract BaseCardLevelEffects model class.

    Creates abstract base class of card-level effects model with ForeignKey field referencing given card class.
    Card-level effects model couples concrete card with its effects.

    :param foreignkey_card_cls: Card class that will be referenced by ForeignKey.
    :return: Abstract BaseCardLevelEffects model class coupling instances of given card model class with it's effects.
    """

    class BaseCardLevelEffects(models.Model):
        """
        This is like an extended many-to-many relation in databases.
        Couples card objects with its effects.
        """

        class Meta:
            abstract = True

        class Target(models.IntegerChoices):
            """
            Possible targets.
            """
            PLAYER = 1, _("gracz")
            OPPONENT = 2 ,_("przeciwnik")

        card = models.ForeignKey(foreignkey_card_cls, related_name='effects', unique=False, on_delete=models.CASCADE)
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

    return BaseCardLevelEffects


class CardLevelEffects(base_card_level_effects_factory(Card)):
    """
    This is like an extended many-to-many relation in databases.
    Couples Card objects with its effects.

    See: BaseCardLevelEffects which is inner class in base_card_level_effects_factory function.
    """

    pass
