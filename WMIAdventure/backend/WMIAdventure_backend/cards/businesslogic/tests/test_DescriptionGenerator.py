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
