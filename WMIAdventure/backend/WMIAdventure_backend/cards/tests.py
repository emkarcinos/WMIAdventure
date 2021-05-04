from django.test import TestCase
from django.db.utils import IntegrityError
from .models import CardLevel
from .serializers import CardLevelSerializer
from .models import CardEffect
from .serializers import CardEffectSerializer


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


class CardEffectTestCase(TestCase):
    def setUp(self):
        pass

    def test_database_populated(self):
        """
        I'm not sure whether this test should exist.
        The database needs to be populated before, but this is more of an integration test rather than unit test.
        I'd rather say this tests the migration, not the model itself.
        """

        # All objects
        entries = CardEffect.objects.all()

        # Gets data from enum class
        enum_vals = CardEffect.EffectId.values
        enum_labels = CardEffect.EffectId.labels

        for i in range(1, len(entries)):
            self.assertEqual(entries[i].id, enum_vals[i])
            self.assertEqual(entries[i].name, enum_labels[i])

    def test_duplicates(self):
        """
        Checks whether you cannot make two models with the same ID
        """
        test_id = 1
        self.assertRaises(IntegrityError,
                          CardEffect.objects.create, id=test_id)


class CardEffectSerializerTestCase(TestCase):

    def setUp(self):
        self.test_id = CardEffect.EffectId.DMG.value
        self.test_name = str(CardEffect.EffectId.DMG.label)
        self.test_tooltip = "sdas d12 e1 wad1"
        CardEffect.objects.get(pk=self.test_id).delete()

    def test_serialization(self):
        test_model = CardEffect.objects.create(id=self.test_id,
                                               name=self.test_name,
                                               tooltip=self.test_tooltip)

        serializer = CardEffectSerializer(instance=test_model)

        actual_id = serializer.data.get('id')
        actual_name = serializer.data.get('name')
        actual_tooltip = serializer.data.get('tooltip')

        self.assertEqual(actual_id, self.test_id)
        self.assertEqual(actual_name, self.test_name)
        self.assertEqual(actual_tooltip, self.test_tooltip)

    def test_deserialization(self):
        data = {'id': self.test_id,
                'name': self.test_name,
                'tooltip': self.test_tooltip}

        serializer = CardEffectSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        sample = serializer.save()

        self.assertEqual(sample.id, self.test_id)
        self.assertEqual(sample.name, self.test_name)
        self.assertEqual(sample.tooltip, self.test_tooltip)
