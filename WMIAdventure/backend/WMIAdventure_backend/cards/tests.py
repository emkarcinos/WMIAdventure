from django.test import TestCase
from django.db.utils import IntegrityError
from .models import CardLevel
from .serializers import CardLevelSerializer


class CardLevelTestCase(TestCase):
    def setUp(self):
        pass

    def test_name_after_creation(self):
        CardLevel.objects.create(level=CardLevel.Level(1))
        c_lvl = CardLevel.objects.get(level=1)

        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_with_int(self):
        c_lvl = CardLevel.objects.create(level=1)

        self.assertIsInstance(c_lvl.level, CardLevel.Level)
        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_duplicates(self):
        CardLevel.objects.create(level=1)

        self.assertRaises(IntegrityError, CardLevel.objects.create, level=1)


class CardLevelSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.cLvlEnum = CardLevel.Level(1)
        self.cLvlVal = self.cLvlEnum.value
        self.cLvlLabel = str(self.cLvlEnum.label)

    def testSerialization(self):
        CardLevel.objects.create(level=self.cLvlEnum)
        cLvl = CardLevel.objects.get(level=self.cLvlVal)

        serializer = CardLevelSerializer(instance=cLvl)

        actualLevel = serializer.data.get("level")
        actualName = serializer.data.get("name")

        self.assertEquals(actualLevel, cLvl.level)
        self.assertEquals(actualName, cLvl.name)

    def testDeserialization(self):
        data = {"level": self.cLvlVal, "name": self.cLvlLabel}

        serializer = CardLevelSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        cLvl = serializer.save()

        self.assertEquals(cLvl.level, self.cLvlVal)
        self.assertEquals(cLvl.name, self.cLvlLabel)

