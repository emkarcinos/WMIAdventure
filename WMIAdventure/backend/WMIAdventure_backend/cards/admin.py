from django.contrib import admin
from django.contrib.admin import StackedInline

from cards import models
from cards.models import CardInfo, CardLevelEffects, Card

admin.site.register(models.CardEffect)


class CardLevelEffectsInline(StackedInline):
    model = CardLevelEffects


@admin.register(Card)
class CardLevelDetailsAdmin(admin.ModelAdmin):
    inlines = [
        CardLevelEffectsInline
    ]

    list_display = ['id', 'name', 'level', 'next_level_cost']

    def name(self, obj):
        return obj.info.name

    def owner(self, obj):
        return obj.info.owner


class CardInline(StackedInline):
    model = Card


@admin.register(CardInfo)
class WholeCardInfoAdmin(admin.ModelAdmin):
    inlines = [
        CardInline
    ]

    list_filter = ['name']
    list_display = ['id', 'name']
