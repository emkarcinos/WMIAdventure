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
        # TODO: Implement this test after BattleCardEffectFactory.create() method is implemented
        pass

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
