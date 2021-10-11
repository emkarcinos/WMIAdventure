from django.db import migrations, models
from cards.models import CardEffect


def update_missing_modifiers(apps, schema_editor):
    def change_modifier_true(effect: CardEffect.EffectId):
        effect = CardEffect.objects.get(pk=effect.value)
        effect.has_modifier = True
        effect.save()

    change_modifier_true(CardEffect.EffectId.EMPOWER)
    change_modifier_true(CardEffect.EffectId.EMPOWER_DMG)
    change_modifier_true(CardEffect.EffectId.EMPOWER_SHIELD)
    change_modifier_true(CardEffect.EffectId.EMPOWER_HEAL)
    change_modifier_true(CardEffect.EffectId.TRUE_DMG)


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0014_merge_20211009_1441'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardeffect',
            name='has_modifier',
            field=models.BooleanField(default=False),
        ),
        migrations.RunPython(update_missing_modifiers),
    ]