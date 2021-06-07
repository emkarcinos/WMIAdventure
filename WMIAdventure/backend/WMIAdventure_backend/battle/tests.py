from django.test import TestCase

from .businesslogic.Deck import Deck
from .businesslogic.Player import Player
from .serializers import *
from .businesslogic.tests import *
from battle.businesslogic.tests.Creator import Creator


class StatisticsSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = Statistics()

        self.data = {"hp": 99.0, "armour": 15.5}

    def test_serialization(self):
        serializer = StatisticsSerializer(instance=self.instance)

        actual_hp = serializer.data.get("hp")
        actual_armour = serializer.data.get("armour")

        self.assertEquals(actual_hp, self.instance.hp)
        self.assertEquals(actual_armour, self.instance.armour)

    def test_deserialization(self):
        serializer = StatisticsSerializer(data=self.data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        statistics = serializer.save()

        self.assertEquals(statistics.hp, self.data.get("hp"))
        self.assertEquals(statistics.armour, self.data.get("armour"))


class OutcomePlayerSerializerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.deck_model = cls.creator.get_attacker_deck()
        cls.deck = Deck(cls.deck_model)

    def setUp(self) -> None:
        self.instance = Player(1, self.deck)

        self.data = {"id": 1, "statistics": Statistics()}

    def test_serialization(self):
        serializer = OutcomePlayerSerializer(instance=self.instance)

        actual_id = serializer.data.get("id")
        actual_statistics = serializer.data.get("statistics")

        self.assertEquals(actual_id, self.instance.id)
        self.assertEquals(actual_statistics.get("hp"), self.instance.statistics.hp)
        self.assertEquals(actual_statistics.get("armour"), self.instance.statistics.armour)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()