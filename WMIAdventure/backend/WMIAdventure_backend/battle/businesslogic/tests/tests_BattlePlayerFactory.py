from unittest import TestCase
from django.contrib.auth import get_user_model
from ..BattlePlayerFactory import BattlePlayerFactory


class BattlePlayerFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = BattlePlayerFactory.get_instance()

    def test_singleton(self):
        self.assertEqual(self.instance, BattlePlayerFactory.get_instance())
