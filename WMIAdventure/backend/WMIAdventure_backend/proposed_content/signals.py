from django.db.models import Min
from django.db.models.signals import post_save
from django.dispatch import receiver

from IngameUsers.models import UserProfile, UserCard
from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
from cards.models import CardInfo
from proposed_content.models import ProposedCard
from proposed_content.models import ProposedCardLevelEffects


@receiver(post_save, sender=ProposedCardLevelEffects)
def generate_effects_description(sender, instance: ProposedCard, **kwargs):
    """
    Purpose of this signal receiver is to update proposed card's effects description each time new effect is
    being added to it (or updated).
    :param sender:
    :param instance: Instance of newly created or updated ProposedCardLevelEffects entry.
    :param kwargs:
    :return: None
    """
    card: ProposedCard = ProposedCard.objects.get(pk=instance.card.id)

    # Description generator needs list of Effect instances - create them
    effect_factory = EffectFactory.get_instance()
    list_of_effects = [effect_factory.create(effect_model) for effect_model in card.effects.all()]

    # Generate description based on list of Effect instances
    description_generator = DescriptionGenerator.get_instance()
    card.effects_description = description_generator.generate_description(list_of_effects)
    card.save()


def give_new_card_to_all_users(new_card_info: CardInfo) -> None:
    """
    This function gives new proposed card to all users after it has been accepted.

    TODO: Remove this function when gaining cards is implemented.
    :param new_card_info: New card that was created.
    """

    # Retrieving Card related to CardInfo with minimal level
    min_level = new_card_info.levels.aggregate(Min('level'))['level__min']
    card_to_give = new_card_info.levels.get(level=min_level)

    # Giving card with lowest level to all users
    user_cards_to_create = [
        UserCard(user_profile=user_profile, card=card_to_give) for user_profile in UserProfile.objects.all()
    ]
    UserCard.objects.bulk_create(user_cards_to_create)
