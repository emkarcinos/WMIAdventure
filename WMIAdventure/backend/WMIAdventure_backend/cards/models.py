from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


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
