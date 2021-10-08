# Generated by Django 3.2 on 2021-07-25 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposed_content', '0002_alter_proposedcardinfo_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposedcard',
            name='effects_description',
            field=models.CharField(default='description', help_text="A brief description of this level's effects.", max_length=100),
        ),
        migrations.AlterField(
            model_name='proposedcardleveleffects',
            name='target',
            field=models.IntegerField(choices=[(1, 'gracz'), (2, 'przeciwnik')], default=2),
        ),
    ]
