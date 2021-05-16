from unittest import TestCase

from .Creator import Creator


class BattlePlayerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
