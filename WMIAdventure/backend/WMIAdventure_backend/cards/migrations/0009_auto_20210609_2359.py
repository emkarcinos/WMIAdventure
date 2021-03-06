# Generated by Django 3.2.1 on 2021-06-09 21:59

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('cards', '0008_refresh_effects_list'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardeffect',
            name='has_modifier',
            field=models.BooleanField(default=False,
                                      help_text='# This field tells us whether a specific effect can have modifiers (power, range, etc). Most of the effect have no such modifiers, so I set the default to be False.'),
        ),
        migrations.AlterField(
            model_name='cardeffect',
            name='name',
            field=models.CharField(help_text='A pretty effect name on-display.', max_length=50),
        ),
        migrations.AlterField(
            model_name='cardeffect',
            name='tooltip',
            field=models.TextField(help_text='Effect description', max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='image',
            field=models.ImageField(blank=True, help_text="An image. We don't reallyknow what should that be.",
                                    null=True, upload_to='cards/images/'),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='name',
            field=models.CharField(help_text="Displayed card's name. Must be unique.", max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='subject',
            field=models.CharField(
                help_text='Subject name. In the future this field will be an id pointing to Subject object.',
                max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='cardinfo',
            name='tooltip',
            field=models.TextField(help_text="Card's description. Gets displayed together with the card as a tooltip."),
        ),
    ]
