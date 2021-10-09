from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.businesslogic.description_generator.DescriptionAppender import DescriptionAppender
from cards.models import CardLevelEffects, CardEffect
from cards.serializers import SimpleCardLevelEffectsSerializer


class DescriptionGenerator:
    """
    A singleton class that generates a description for some card using it's effects.
    """
    instance = None

    def __init__(self):
        pass

    @staticmethod
    def get_instance():
        if DescriptionGenerator.instance is None:
            DescriptionGenerator.instance = DescriptionGenerator()
        return DescriptionGenerator.instance

    @staticmethod
    def generate_description(effects: list[Effect]) -> str:
        """
        Generates a description using the provided list of effects.
        @param effects: An array of Effect objects
        @return Generated description as a string
        """
        appender = DescriptionAppender()
        for effect in effects:
            appender.append(effect.description())

        return appender.process()

    @staticmethod
    def generate_description_from_json(data: list[dict]) -> str:
        """
        Parses a JSON array of effects (See SimpleCardLevelEffectsSerializer) and generates the description based
        of off them.
        @param data: An array of dictionaries with effect data
        @return Generated description as a string
        """
        effects = []
        for effect in data:
            serializer = SimpleCardLevelEffectsSerializer(data=effect)
            if serializer.is_valid():
                effect_model = CardLevelEffects(card_effect=CardEffect(pk=effect['card_effect']),
                                                target=CardLevelEffects.Target(effect['target']),
                                                power=effect['power'],
                                                range=effect['range'])
                effects.append(EffectFactory.get_instance().create(effect_model))

        return DescriptionGenerator.generate_description(effects)
