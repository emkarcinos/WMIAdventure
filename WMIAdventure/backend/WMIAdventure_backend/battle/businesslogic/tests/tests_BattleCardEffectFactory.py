from django.test import TestCase

from .Creator import Creator
from ..BattleCardEffectFactory import BattleCardEffectFactory


class BattleCardEffectFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = BattleCardEffectFactory.get_instance()

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    def test_singleton(self):
        self.assertEqual(self.instance, BattleCardEffectFactory.get_instance())

    def test_creation(self):
        # TODO: Implement this test after BattleCardEffectFactory.create() method is implemented
        pass

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
