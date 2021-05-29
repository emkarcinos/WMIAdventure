from django.test import TestCase

from battle.businesslogic.effects.EffectFactory import EffectFactory
from battle.businesslogic.tests.Creator import Creator


class BattleCardEffectFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = EffectFactory.get_instance()

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    def test_singleton(self):
        self.assertEqual(self.instance, EffectFactory.get_instance())

    def test_creation(self):
        deck = self.creator.get_attacker_deck()
        card_model = deck.card1.card
        effect = card_model.effects.all()[0]
        returned_effect = self.instance.create(effect)
        self.assertIs(returned_effect.effect_model, effect)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
