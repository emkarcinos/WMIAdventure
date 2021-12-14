from django.contrib import admin
from django.contrib.admin import StackedInline

from proposed_content.models import ProposedCard, ProposedCardInfo, ProposedCardLevelEffects
from proposed_content.views import accept_proposed_card


class ProposedCardLevelEffectsInline(StackedInline):
    model = ProposedCardLevelEffects


@admin.register(ProposedCard)
class ProposedCardLevelDetailsAdmin(admin.ModelAdmin):
    inlines = [
        ProposedCardLevelEffectsInline
    ]

    list_display = ['id', 'name', 'level', 'next_level_cost', 'owner']

    def name(self, obj):
        return obj.info.name

    def owner(self, obj):
        return obj.info.owner


class ProposedCardInline(StackedInline):
    model = ProposedCard


def accept_proposed_cards(model_admin, request, queryset):
    proposed_card_info: ProposedCardInfo
    for proposed_card_info in queryset:
        accept_proposed_card(proposed_card_info)


@admin.register(ProposedCardInfo)
class WholeProposedCardInfoAdmin(admin.ModelAdmin):
    inlines = [
        ProposedCardInline
    ]

    list_filter = ['name']
    list_display = ['id', 'name', 'owner']

    actions = [accept_proposed_cards]
