from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework.test import APIRequestFactory

from .serializers import *
from .views import *


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
        self.test_modifiers = True
        CardEffect.objects.get(pk=self.test_id).delete()

    def test_serialization(self):
        test_model = CardEffect.objects.create(id=self.test_id,
                                               name=self.test_name,
                                               tooltip=self.test_tooltip,
                                               has_modifier=True)

        serializer = CardEffectSerializer(instance=test_model)

        actual_id = serializer.data.get('id')
        actual_name = serializer.data.get('name')
        actual_tooltip = serializer.data.get('tooltip')
        actual_modifier = serializer.data.get('has_modifier')

        self.assertEqual(actual_id, self.test_id)
        self.assertEqual(actual_name, self.test_name)
        self.assertEqual(actual_tooltip, self.test_tooltip)
        self.assertEqual(actual_modifier, self.test_modifiers)

    def test_deserialization(self):
        data = {'id': self.test_id,
                'name': self.test_name,
                'tooltip': self.test_tooltip,
                'has_modifiers': True}

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
        self.instance.delete()
        data = {"name": self.name, "tooltip": self.tooltip}
        serializer = CardInfoSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        card_info = serializer.save()

        self.assertEquals(card_info.name, self.name)
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

    def test_serialization(self):
        card_info = CardInfo.objects.create(name="Name", tooltip="Tooltip", subject=None)
        card_info.save()

        card1 = card_info.levels.create(level=CardLevel.objects.get(pk=1), next_level_cost=5)
        card1.effects.create(
            card_effect=CardEffect.objects.get(pk=1),
            power=5,
            range=1
        )

        card2 = card_info.levels.create(level=CardLevel.objects.get(pk=2), next_level_cost=6)
        card2.effects.create(
            card_effect=CardEffect.objects.get(pk=1),
            power=8,
            range=3
        )
        card2.effects.create(
            card_effect=CardEffect.objects.get(pk=2),
            power=5,
            range=2
        )

        serializer = WholeCardSerializer(instance=card_info)

        for i, expected_card in enumerate(card_info.levels.all()):
            actual_card_data = serializer.data["levels"][i]
            self.assertEqual(actual_card_data['level'], expected_card.level.level)
            self.assertEqual(actual_card_data['next_level_cost'], expected_card.next_level_cost)

            for j, expected_effect in enumerate(expected_card.effects.all()):
                actual_effect_data = actual_card_data['effects'][j]
                self.assertEqual(actual_effect_data['card_effect'], expected_effect.card_effect_id)
                self.assertEqual(actual_effect_data['target'], expected_effect.target)
                self.assertEqual(actual_effect_data['power'], expected_effect.power)
                self.assertEqual(actual_effect_data['range'], expected_effect.range)

    def test_deserialization(self):
        data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 2,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 5,
                                "range": 2.5
                            },
                            {
                                "card_effect": 5,
                                "target": 2,
                                "power": 1,
                                "range": None
                            }
                        ]
                    },
                    {
                        "level": 2,
                        "next_level_cost": 4,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 5,
                                "range": 2.5
                            },
                            {
                                "card_effect": 5,
                                "target": 2,
                                "power": 1,
                                "range": None
                            },
                            {
                                "card_effect": 7,
                                "target": 2,
                                "power": 2,
                                "range": None
                            }
                        ]
                    },
                    {
                        "level": 3,
                        "next_level_cost": None,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 10,
                                "range": 2.5
                            },
                            {
                                "card_effect": 7,
                                "target": 2,
                                "power": 2,
                                "range": None
                            }
                        ]
                    }

                ]
            }

        serializer = WholeCardSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        card_info = serializer.save()

        self.assertEqual(card_info.name, data["name"])
        self.assertEqual(card_info.tooltip, data["tooltip"])
        self.assertEqual(card_info.image, data["image"])
        self.assertEqual(card_info.subject, data["subject"])

        for i, card in enumerate(card_info.levels.all()):
            expected_card_data = data["levels"][i]
            self.assertEqual(card.level.level, expected_card_data["level"])
            self.assertEqual(card.next_level_cost, expected_card_data["next_level_cost"])

            for j, effect in enumerate(card.effects.all()):
                expected_effect_data = expected_card_data["effects"][j]
                self.assertEqual(effect.card_effect.id, expected_effect_data["card_effect"])
                self.assertEqual(effect.target, expected_effect_data["target"])
                self.assertEqual(effect.power, expected_effect_data["power"])
                self.assertEqual(effect.range, expected_effect_data["range"])

    def test_big_numbers(self):
        data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 23985082739857291759127469576192,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 5351241231241236123461245435346,
                                "range": 212512312312412412.5347326598723645862834658
                            }
                        ]
                    }
                ]
            }

        serializer = WholeCardSerializer(data=data)

        self.assertFalse(serializer.is_valid())

    def test_validators_level_cost(self):
        data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 101,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": None,
                                "range": None
                            }
                        ]
                    }
                ]
            }
        serializer = WholeCardSerializer(data=data)

        self.assertFalse(serializer.is_valid())

        data['levels'][0]['next_level_cost'] = -5
        serializer = WholeCardSerializer(data=data)

        self.assertFalse(serializer.is_valid())

    def test_validators_card_level_effects(self):
        data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 5,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 101,
                                "range": None
                            }
                        ]
                    }
                ]
            }

        # Large power
        serializer = WholeCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Negative power
        data['levels'][0]['effects'][0]['power'] = -5
        serializer = WholeCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Negative Range
        data['levels'][0]['effects'][0]['power'] = 10
        data['levels'][0]['effects'][0]['range'] = -5
        serializer = WholeCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Large Range
        data['levels'][0]['effects'][0]['range'] = 101
        serializer = WholeCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_duplicates(self):
        data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 10,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": None,
                                "range": None
                            }
                        ]
                    }
                ]
            }
        serializer = WholeCardSerializer(data=data)

        serializer.is_valid()
        serializer.save()

        serializer = WholeCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())


class WholeCardDetailsTestCase(TestCase):
    def setUp(self):
        # Creating test object
        self.data = \
            {
                "name": "Quicksort",
                "subject": None,
                "image": None,
                "tooltip": "tekst",
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 2,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 5,
                                "range": 2.5
                            },
                            {
                                "card_effect": 5,
                                "target": 2,
                                "power": 1,
                                "range": None
                            }
                        ]
                    },
                    {
                        "level": 2,
                        "next_level_cost": 4,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 5,
                                "range": 2.5
                            },
                            {
                                "card_effect": 5,
                                "target": 2,
                                "power": 1,
                                "range": None
                            },
                            {
                                "card_effect": 7,
                                "target": 2,
                                "power": 2,
                                "range": None
                            }
                        ]
                    },
                    {
                        "level": 3,
                        "next_level_cost": None,
                        "effects": [
                            {
                                "card_effect": 2,
                                "target": 1,
                                "power": 10,
                                "range": 2.5
                            },
                            {
                                "card_effect": 7,
                                "target": 2,
                                "power": 2,
                                "range": None
                            }
                        ]
                    }

                ]
            }

        serializer = WholeCardSerializer(data=self.data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        self.card_info = serializer.save()

    def test_delete_not_allowed(self):
        factory = APIRequestFactory()
        view = WholeCardDetails.as_view()
        testRequest = factory.delete('api/cards/all/' + str(self.card_info.id))
        response = view(testRequest)

        self.assertEqual(response.status_code, 405)


class WholeCardListTestCase(TestCase):
    def test_create_card_without_levels(self):
        data = {
            "name": "Quicksort",
            "tooltip": "tekst"
        }

        factory = APIRequestFactory()
        view = WholeCardList.as_view()
        request = factory.post('/api/cards/', data)
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
