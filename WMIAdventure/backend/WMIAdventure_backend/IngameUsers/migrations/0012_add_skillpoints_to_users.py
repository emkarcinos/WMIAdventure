from django.db import migrations, transaction

from IngameUsers.businesslogic.experience.Experience import Experience
from IngameUsers.businesslogic.skill_points import calculate_skill_points_gain


def add_skillpoints_to_all_users(apps, schema_editor):
    UserStats = apps.get_model('IngameUsers', 'UserStats')

    with transaction.atomic():
        for user_stats in UserStats.objects.all():
            current_level = Experience(user_stats.exp).level
            skill_points = calculate_skill_points_gain(1, current_level)
            user_stats.skill_points = skill_points
            user_stats.save()


class Migration(migrations.Migration):
    dependencies = [
        ('IngameUsers', '0011_cleanup_user_cards')
    ]

    operations = [
        migrations.RunPython(add_skillpoints_to_all_users)
    ]
