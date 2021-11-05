from django.db import migrations

from cards.models import CardEffect as ModelCardEffect


def update_missing_modifiers(apps, schema_editor):
    CardEffect = apps.get_model('cards', 'CardEffect')
    def change_modifier_true(effect: ModelCardEffect.EffectId):
        effect = CardEffect.objects.get(pk=effect.value)
        effect.has_modifier = True
        effect.save()

    change_modifier_true(ModelCardEffect.EffectId.EMPOWER)
    change_modifier_true(ModelCardEffect.EffectId.EMPOWER_DMG)
    change_modifier_true(ModelCardEffect.EffectId.EMPOWER_SHIELD)
    change_modifier_true(ModelCardEffect.EffectId.EMPOWER_HEAL)
    change_modifier_true(ModelCardEffect.EffectId.TRUE_DMG)


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0014_merge_20211009_1441'),
    ]

    operations = [
        migrations.RunPython(update_missing_modifiers),
    ]