# Generated by Django 3.2.4 on 2021-10-08 13:14

import cards.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0012_alter_cardinfo_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardinfo',
            name='image',
            field=models.FileField(blank=True, help_text="An image. We don't reallyknow what should that be.", null=True, upload_to='cards/images/', validators=[cards.validators.validate_file_size]),
        ),
    ]
