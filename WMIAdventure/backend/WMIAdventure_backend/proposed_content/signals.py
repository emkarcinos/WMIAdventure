from django.db.models.signals import post_save
from django.dispatch import receiver

from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
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
