from django.test import TestCase
from django.db.utils import IntegrityError
from .models import CardLevel
from .serializers import CardLevelSerializer


class CardLevelTestCase(TestCase):
    def setUp(self):
        pass

    def testNameAfterCreation(self):
        CardLevel.objects.create(level=CardLevel.Level(1))
        cLvl = CardLevel.objects.get(level=1)

        self.assertEqual(cLvl.name, CardLevel.Level(1).label)

    def testCreationWithInt(self):
        cLvl = CardLevel.objects.create(level=1)

        self.assertIsInstance(cLvl.level, CardLevel.Level)
        self.assertEqual(cLvl.name, CardLevel.Level(1).label)

    def testCreationDuplicates(self):
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

