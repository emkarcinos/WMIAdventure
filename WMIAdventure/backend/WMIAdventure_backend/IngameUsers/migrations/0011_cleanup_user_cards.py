from django.db import migrations, transaction
from django.db.models import F, Min, Q


def remove_multiple_card_levels_from_profiles(apps, schema_editor, dry_run=False):
    CardInfo = apps.get_model('cards', 'CardInfo')
    UserCard = apps.get_model('IngameUsers', 'UserCard')
    UserProfile = apps.get_model('IngameUsers', 'UserProfile')

    with transaction.atomic():
        print('')
        profiles = UserProfile.objects.all()

        affected_profiles_count = 0
        for profile in profiles:
            owned_info_ids = profile.user_cards.annotate(info=F('card__info')).values_list('info', flat=True)

            infos = CardInfo.objects.filter(Q(pk__in=owned_info_ids))

            cards_to_remove_count = 0
            for card_info in infos:
                cards = UserCard.objects.filter(card__info=card_info, user_profile=profile)
                if cards.count() <= 1:
                    continue

                min_level = card_info.levels.aggregate(Min('level'))['level__min']
                min_level_card = cards.filter(card__level=min_level)
                cards_to_remove = cards.difference(min_level_card)

                print(f'removing {len(cards_to_remove)} cards from profile {repr(profile.displayedUsername)}')
                cards_to_remove_count += 1
                if not dry_run:
                    ids_to_remove = cards_to_remove.values_list('id')
                    UserCard.objects.filter(Q(pk__in=ids_to_remove)).delete()

            if cards_to_remove_count:
                affected_profiles_count += 1
                print(f'removed {cards_to_remove_count} from profile {repr(profile.displayedUsername)}')

        print(f'Done. Affected profiles: {affected_profiles_count}')


class Migration(migrations.Migration):
    dependencies = [
        ('IngameUsers', '0010_userstats_skill_points'),
        ('cards', '0020_alter_card_next_level_cost'),
    ]

    operations = [
        migrations.RunPython(
            lambda apps, schema_editor: remove_multiple_card_levels_from_profiles(apps, schema_editor, dry_run=False)
        )
    ]
