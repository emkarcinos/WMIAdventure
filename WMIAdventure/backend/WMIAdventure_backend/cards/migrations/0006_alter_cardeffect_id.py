# Generated by Django 3.2 on 2021-05-30 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0004_auto_20210507_1008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardeffect',
            name='id',
            field=models.IntegerField(choices=[(1, 'Zadawanie obrażeń'), (2, 'Tarcza'), (3, 'Losowa zamiana kolejności kart'), (4, 'Zatrzymanie na jedną turę'), (5, 'Dwukrotne wykonanie się karty'), (6, 'Leczenie'), (7, 'Blokowanie następnej karty'), (8, 'Zwiększenie mocy następnej karty'), (9, 'Pomijanie następnej karty'), (10, 'Zwiększenie obrażeń następnej karty'), (11, 'Zwiększenie mocy tarczy następnej karty'), (12, 'Zwiększenie mocy leczenia następnej karty'), (13, 'Obrażenia nieuchronne')], default=1, primary_key=True, serialize=False),
        ),
    ]
