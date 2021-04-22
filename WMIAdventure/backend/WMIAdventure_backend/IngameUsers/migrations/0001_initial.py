# Generated by Django 3.2 on 2021-04-22 18:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('semesterNumber', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='BasicUserInfo',
            fields=[
                ('userId', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50)),
                ('semester', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='IngameUsers.semester')),
            ],
        ),
        migrations.RunSQL(r"INSERT INTO IngameUsers_semester (semesterNumber) VALUES (1),(2),(3),(4),5),(6),(7);")
    ]
