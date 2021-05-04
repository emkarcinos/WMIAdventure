# Generated by Django 3.2 on 2021-05-04 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CardLevel',
            fields=[
                ('level', models.IntegerField(choices=[(1, 'Common')], default=1, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
    ]
