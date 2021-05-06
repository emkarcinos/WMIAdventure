from django.test import TestCase
from django.db.utils import IntegrityError
from rest_framework.parsers import JSONParser

from .models import *
from .serializers import *


class CardLevelTestCase(TestCase):
    def setUp(self):
        pass

    def testNameAfterCreation(self):
        CardLevel.objects.get(level=1).delete()

        CardLevel.objects.create(level=CardLevel.Level(1))
        cLvl = CardLevel.objects.get(level=1)

        self.assertEqual(cLvl.name, CardLevel.Level(1).label)

    def testCreationWithInt(self):
        CardLevel.objects.get(level=1).delete()

        cLvl = CardLevel.objects.create(level=1)

        self.assertIsInstance(cLvl.level, CardLevel.Level)
        self.assertEqual(cLvl.name, CardLevel.Level(1).label)

    def testCreationDuplicates(self):
        self.assertRaises(IntegrityError, CardLevel.objects.create, level=1)


class CardLevelSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.cLvlEnum = CardLevel.Level(1)
        self.cLvlVal = self.cLvlEnum.value
        self.cLvlLabel = str(self.cLvlEnum.label)

    def testSerialization(self):
        cLvl = CardLevel.objects.get(level=self.cLvlVal)

        serializer = CardLevelSerializer(instance=cLvl)

        actualLevel = serializer.data.get("level")
        actualName = serializer.data.get("name")

        self.assertEquals(actualLevel, cLvl.level)
        self.assertEquals(actualName, cLvl.name)

    def testDeserialization(self):
        CardLevel.objects.get(level=self.cLvlVal).delete()

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


class CardInfoTestCase(TestCase):
    def test_create_without_image(self):
        object = CardInfo.objects.create(name="Name", tooltip="Tooltip")
        object.save()

        self.assertFalse(object.image)  # Assert image is None


class CardInfoSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.name = "Name"
        self.tooltip = "Tooltip tooltip tooltip tooltip tooltip tooltip."
        self.instance = CardInfo.objects.create(name=self.name, tooltip=self.tooltip)
        self.instance.save()

    def test_serialization(self):
        serializer = CardInfoSerializer(instance=self.instance)

        actualName = serializer.data.get("name")
        actualTooltip = serializer.data.get("tooltip")
        actualImage = serializer.data.get("image")

        self.assertEquals(actualName, self.instance.name)
        self.assertEquals(actualTooltip, self.instance.tooltip)
        self.assertEquals(bool(actualImage), bool(self.instance.image))

    def test_deserialization(self):
        data = {"name": "asdasd", "tooltip": self.tooltip}
        serializer = CardInfoSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        card_info = serializer.save()

        self.assertEquals(card_info.name, data.get('name'))
        self.assertEquals(card_info.tooltip, self.tooltip)
        self.assertEquals(card_info.image, self.instance.image)


class CardSerializerTestCase(TestCase):

    def setUp(self):
        self.test_id = 1
        self.info_id = 1
        self.test_level = 1
        self.test_cost = 20
        # Check whether any CardInfos exist prior to running the tests
        # Create one if there's none
        try:
            self.cardInfo = CardInfo.objects.get(pk=self.info_id)
        except CardInfo.DoesNotExist:
            self.cardInfo = CardInfo.objects.create(id=self.info_id)

    def test_deserialization(self):
        data = {'id': self.test_id,
                'info': self.info_id,
                'level': self.test_level,
                'next_level_cost': self.test_cost}

        serializer = CardSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        sample = serializer.save()

        self.assertEqual(sample.id, self.test_id)
        self.assertEqual(sample.info.id, self.info_id)
        self.assertEqual(sample.level.level, self.test_level)
        self.assertEqual(sample.next_level_cost, self.test_cost)

    def test_serialization(self):
        info = CardInfo.objects.get(pk=self.info_id)
        level = CardLevel.objects.get(pk=self.test_level)
        sample = Card.objects.create(id=self.test_id,
                                     info=info,
                                     level=level,
                                     next_level_cost=self.test_cost)

        serializer = CardSerializer(instance=sample)

        actual_id = serializer.data.get('id')
        actual_level = serializer.data.get('level')
        actual_info = serializer.data.get('info')
        actual_cost = serializer.data.get('next_level_cost')

        self.assertEqual(actual_id, self.test_id)
        self.assertEqual(actual_level, self.test_level)
        self.assertEqual(actual_info, self.info_id)
        self.assertEqual(actual_cost, self.test_cost)


class CardLevelEffectsSerializerTestCase(TestCase):
    def setUp(self):
        # set up necessary database entries
        self.card_info = CardInfo.objects.create(name="test", tooltip="jechane")
        self.card = Card.objects.create(info=self.card_info,
                                        level=CardLevel(CardLevel.Level.COMMON),
                                        next_level_cost=50)

    def test_serialization(self):
        effect = CardEffect.objects.get(pk=2)
        target = CardLevelEffects.Target.OPPONENT
        power = 100
        range = 10.125125
        sample = CardLevelEffects.objects.create(card=self.card,
                                                 card_effect=effect,
                                                 power=power,
                                                 range=range,
                                                 target=target)
        serializer = CardLevelEffectsSerializer(instance=sample)

        actual_card = serializer.data.get('card')
        actual_effect = serializer.data.get('card_effect')
        actual_target = serializer.data.get('target')
        actual_power = serializer.data.get('power')
        actual_range = serializer.data.get('range')

        self.assertEqual(actual_card, self.card.id)
        self.assertEqual(actual_power, power)
        self.assertEqual(actual_target, target.value)
        self.assertEqual(actual_range, range)
        self.assertEqual(actual_effect, effect.id)

    def test_deserialization(self):
        effect = CardEffect.EffectId.DMG
        target = CardLevelEffects.Target.OPPONENT
        power = 5
        range = 12.2
        data = {'card': self.card.id,
                'card_effect': effect,
                'target': target.value,
                'power': power,
                'range': range}

        serializer = CardLevelEffectsSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        sample = serializer.save()

        self.assertEqual(effect, sample.card_effect.id)
        self.assertEqual(target, sample.target)
        self.assertEqual(power, sample.power)
        self.assertEqual(range, sample.range)
        self.assertEqual(self.card, sample.card)


class WholeCardSerializerTestCase(TestCase):
    def setUp(self):
        pass

    def test_deserialization(self):
        data = {"name": "Quicksort","subject": None,"image": None,"tooltip": "tekst","levels": [{"level": 1,"upgradeCost": 2,"effects": [{"id": 2,"target": 1,"power": 5,"range": 2.5},{"id": 5,"target": 2,"power": 1,"range": None}]},{"level": 2,"upgradeCost": 4,"effects": [{"id": 2,"target": 1,"power": 5,"range": 2.5},{"id": 5,"target": 2,"power": 1,"range": None},{"id": 7,"target": 2,"power": 2,"range": None}]},{"level": 3,"upgradeCost": None,"effects": [{"id": 2,"target": 1,"power": 10,"range": 2.5},{"id": 7,"target": 2,"power": 2,"range": None}]}]}

        serializer = WholeCardSerializer(data=data)
        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        sample = serializer.save()

        self.assertEqual(sample.get('info').name, data.get('name'))
        self.assertEqual(sample.get('info').image, data.get('image'))
        self.assertEqual(sample.get('info').tooltip, data.get('tooltip'))
        # I wont test every single possible value, no no no

        # Testing if CardLevelEffects instances were created properly
        self.assertEqual(sample.get('cardLevelEffects')[0].power, data['levels'][0]['effects'][0]['power'])
        self.assertEqual(sample.get('cardLevelEffects')[0].range, data['levels'][0]['effects'][0]['range'])

        # Testing if Card instances were created properly
        self.assertEqual(sample.get('cards')[0].next_level_cost, data['levels'][0]['upgradeCost'])
        self.assertEqual(sample.get('cards')[0].level.level, data['levels'][0]['level'])

    def test_serialization(self):
        # Create model instances
        card_info = CardInfo.objects.create(name="testname",
                                            tooltip="testtooltip")
        card = Card.objects.create(info=card_info,
                                   level=CardLevel.objects.get(pk=CardLevel.Level.COMMON),
                                   next_level_cost=2)
        card_level_effects = CardLevelEffects.objects.create(card=card,
                                                             card_effect=CardEffect.objects.get(pk=CardEffect.EffectId.DMG),
                                                             target=CardLevelEffects.Target.OPPONENT,
                                                             power=50,
                                                             range=2.5)

        # Interpret model instances as class instances understood by serializer
        meta = WholeCardSerializer.translate_models(card_info)

        sample = WholeCardSerializer(meta)

        self.assertEqual(sample.data.get('name'), card_info.name)
        self.assertEqual(sample.data.get('tooltip'), card_info.tooltip)

        self.assertEqual(sample.data.get('levels')[0]['level'], card.level.level)
        self.assertEqual(sample.data.get('levels')[0]['upgradeCost'], card.next_level_cost)

        self.assertEqual(sample.data.get('levels')[0]['effects'][0]['id'], card_level_effects.card_effect.id)
        self.assertEqual(sample.data.get('levels')[0]['effects'][0]['target'], card_level_effects.target)
        self.assertEqual(sample.data.get('levels')[0]['effects'][0]['power'], card_level_effects.power)
        self.assertEqual(sample.data.get('levels')[0]['effects'][0]['range'], card_level_effects.range)
