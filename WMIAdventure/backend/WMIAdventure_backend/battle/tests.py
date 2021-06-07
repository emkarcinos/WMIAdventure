from django.test import TestCase

# Create your tests here.
from .businesslogic.Statistics import Statistics
from .serializers import *
from .businesslogic.tests import *


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