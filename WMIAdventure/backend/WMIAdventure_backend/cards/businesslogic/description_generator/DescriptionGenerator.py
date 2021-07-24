from battle.businesslogic.effects.Effect import Effect
from cards.businesslogic.description_generator.DescriptionAppender import DescriptionAppender


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
