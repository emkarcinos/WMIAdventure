# Generated by Django 3.2.5 on 2021-12-19 11:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposed_content', '0009_alter_proposedcard_effects_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposedcard',
            name='next_level_cost',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
    ]
