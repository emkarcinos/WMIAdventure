from battle.businesslogic.effects.Effect import Effect


class DescriptionGenerator:
    """
    A singleton class that generates a description for some card using it's effects.
    """
    instance = None

    def __init__(self):
        pass

    @staticmethod
    def get_instance(self):
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

        return ""
