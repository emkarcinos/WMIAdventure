# Generated by Django 3.2.4 on 2021-10-11 15:08

import cards.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposed_content', '0005_merge_20211007_2300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposedcardinfo',
            name='image',
            field=models.FileField(blank=True, help_text="An image. We don't reallyknow what should that be.", null=True, upload_to='proposed_content/cards/images/', validators=[cards.validators.validate_file_size]),
        ),
        migrations.AlterField(
            model_name='proposedcardinfo',
            name='name',
            field=models.CharField(help_text="Displayed card's name.", max_length=36),
        ),
        migrations.AlterField(
            model_name='proposedcardinfo',
            name='subject',
            field=models.CharField(help_text='Subject name. In the future this field will be an id pointing to Subject object.', max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='proposedcardinfo',
            name='tooltip',
            field=models.TextField(help_text="Card's description. Gets displayed together with the card as a tooltip.", max_length=80),
        ),
    ]
