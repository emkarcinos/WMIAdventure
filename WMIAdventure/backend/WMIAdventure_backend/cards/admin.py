from django.contrib import admin

from cards import models

admin.site.register(models.CardEffect)
admin.site.register(models.Card)
admin.site.register(models.CardLevelEffects)
