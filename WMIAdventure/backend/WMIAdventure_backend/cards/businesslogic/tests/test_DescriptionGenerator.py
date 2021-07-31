from unittest import TestCase

from battle.businesslogic.effects.Effect import Effect
from cards.businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
from cards.models import CardLevelEffects


class DescriptionGeneratorTestCase(TestCase):
    def setUp(self) -> None:
        effect_model = CardLevelEffects(target=CardLevelEffects.Target.OPPONENT,
                                        power=5,
                                        range=2)
        self.effect = Effect(effect_model)

    def test_single_description(self):
        generator = DescriptionGenerator.get_instance()
        generated_description = generator.generate_description([self.effect])

        self.assertEqual("Efekt o mocy 3 - 7 skierowany w przeciwnika.", generated_description)

    def test_json(self):
        generator = DescriptionGenerator.get_instance()
        data = [{
            'card_effect': 1,
            'target': 1,
            'power': 5,
            'range': 2,
        }]

        result = generator.generate_description_from_json(data)

        # I know that this assertion is horrible, but this would turn into a massive integration test if we
        # were to check for an exact output. That was already tested before and this just really tests whether
        # the method actually returns anything.
        self.assertGreater(len(result), 0)
