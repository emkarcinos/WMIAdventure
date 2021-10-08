from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .businesslogic.tests import *

from .serializers import *
from .views import *


class CardLevelTestCase(TestCase):
    def setUp(self):
        pass

    def test_name_after_creation(self):
        CardLevel.objects.get(level=1).delete()

        CardLevel.objects.create(level=CardLevel.Level(1))
        c_lvl = CardLevel.objects.get(level=1)

        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_with_int(self):
        CardLevel.objects.get(level=1).delete()

        c_lvl = CardLevel.objects.create(level=1)

        self.assertIsInstance(c_lvl.level, CardLevel.Level)
        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_duplicates(self):
        self.assertRaises(IntegrityError, CardLevel.objects.create, level=1)


class CardLevelSerializerTestCase(TestCase):
    def setUp(self) -> None:
        self.c_lvl_enum = CardLevel.Level(1)
        self.c_lvl_val = self.c_lvl_enum.value
        self.c_lvl_label = str(self.c_lvl_enum.label)

    def test_serialization(self):
        cLvl = CardLevel.objects.get(level=self.c_lvl_val)

        serializer = CardLevelSerializer(instance=cLvl)

        actual_level = serializer.data.get("level")
        actual_name = serializer.data.get("name")

        self.assertEquals(actual_level, cLvl.level)
        self.assertEquals(actual_name, cLvl.name)

    def test_deserialization(self):
        CardLevel.objects.get(level=self.c_lvl_val).delete()

        data = {"level": self.c_lvl_val, "name": self.c_lvl_label}

        serializer = CardLevelSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        c_lvl = serializer.save()

        self.assertEquals(c_lvl.level, self.c_lvl_val)
        self.assertEquals(c_lvl.name, self.c_lvl_label)


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
        self.info_id = 1
        self.test_level = 1
        self.test_cost = 20
        self.test_description = "test"

        # Create CardInfo object for tests.
        while len(CardInfo.objects.filter(pk=self.info_id)) > 0:
            self.info_id += 1
        self.cardInfo = CardInfo.objects.create(id=self.info_id)

    def tearDown(self) -> None:
        self.cardInfo.delete()

    def test_deserialization(self):
        data = {
            'info': self.info_id,
            'level': self.test_level,
            'effects_description': self.test_description,
            'next_level_cost': self.test_cost}

        serializer = CardSerializer(data=data)

        try:
            self.assertTrue(serializer.is_valid())
        except AssertionError as e:
            print(serializer.errors)
            raise e

        sample = serializer.save()

        self.assertEqual(sample.info.id, self.info_id)
        self.assertEqual(sample.level.level, self.test_level)
        self.assertEqual(sample.next_level_cost, self.test_cost)
        self.assertEqual(sample.effects_description, self.test_description)

        sample.delete()  # Delete object from database

    def test_serialization(self):
        info = CardInfo.objects.get(pk=self.info_id)
        level = CardLevel.objects.get(pk=self.test_level)
        sample = Card.objects.create(
            info=info,
            level=level,
            next_level_cost=self.test_cost,
            effects_description=self.test_description)

        serializer = CardSerializer(instance=sample)

        actual_id = serializer.data.get('id')
        actual_level = serializer.data.get('level')
        actual_info = serializer.data.get('info')
        actual_cost = serializer.data.get('next_level_cost')
        actual_desc = serializer.data.get('effects_description')

        self.assertEqual(actual_id, sample.id)
        self.assertEqual(actual_level, self.test_level)
        self.assertEqual(actual_info, self.info_id)
        self.assertEqual(actual_cost, self.test_cost)
        self.assertEqual(actual_desc, self.test_description)


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

        card1 = card_info.levels.create(level=CardLevel.objects.get(pk=1), next_level_cost=5,
                                        effects_description="desc1")
        card1.effects.create(
            card_effect=CardEffect.objects.get(pk=1),
            power=5,
            range=1
        )

        card2 = card_info.levels.create(level=CardLevel.objects.get(pk=2), next_level_cost=6,
                                        effects_description="desc2")
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
            self.assertEqual(actual_card_data['effects_description'], expected_card.effects_description)

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
                        "effects_description": "desc1",
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
                        "effects_description": "desc2",
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
                        "effects_description": "desc3",
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
            self.assertEqual(card.effects_description, expected_card_data["effects_description"])

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
                                "power": 0,
                                "range": 0
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
                                "range": 0
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
                                "power": 0,
                                "range": 0
                            }
                        ]
                    }
                ]
            }
        serializer = WholeCardSerializer(data=data)

        serializer.is_valid()
        serializer.save()

        serializer = WholeCardSerializer(data=data)
        self.assertTrue(
            serializer.is_valid())  # Assert that validation passes, because serializer is not creating object yet
        self.assertRaises(serializers.ValidationError,
                          serializer.save)  # Assert that trying to create card with duplicate name raises error

    def test_empty_modifiers(self):
        """
        Scenario: Effect which should have modifiers is provided. Modifiers are not provided.
        Expected result: ValidationError is raised.
        """

        # Setup
        card_effect: CardEffect = CardEffect.objects.filter(has_modifier=True).first()

        subject = None
        image = None
        tooltip = "Tooltip"
        level = 1
        next_level_cost = None
        target = 1

        # Assert there is some effect which should have modifiers in database.
        self.assertIsNotNone(card_effect)

        card_effect_id = card_effect.id

        # Assert that with modifiers everything is OK

        valid_power = 10
        valid_range = 0.0
        name1 = "Name1"

        valid_data = \
            {
                "name": name1,
                "subject": subject,
                "image": image,
                "tooltip": tooltip,
                "levels": [
                    {
                        "level": level,
                        "next_level_cost": next_level_cost,
                        "effects": [
                            {
                                "card_effect": card_effect_id,
                                "target": target,
                                "power": valid_power,
                                "range": valid_range
                            }
                        ]
                    }
                ]
            }
        valid_serializer = WholeCardSerializer(data=valid_data)
        # Assert no error is being raised with valid data.
        valid_serializer.is_valid(raise_exception=True)

        # Assert that with the same data but without modifiers data is not valid

        invalid_power = None
        invalid_range = None
        name2 = "Name2"

        invalid_data = \
            {
                "name": name2,
                "subject": subject,
                "image": image,
                "tooltip": tooltip,
                "levels": [
                    {
                        "level": level,
                        "next_level_cost": next_level_cost,
                        "effects": [
                            {
                                "card_effect": card_effect_id,
                                "target": target,
                                "power": invalid_power,
                                "range": invalid_range
                            }
                        ]
                    }
                ]
            }
        invalid_serializer = WholeCardSerializer(data=invalid_data)
        # Assert raises Validation Error
        self.assertRaises(serializers.ValidationError, invalid_serializer.is_valid, raise_exception=True)


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
        self.skipTest("delete is now allowed")
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


class DescriptionGeneratorViewTestCase(TestCase):
    def test_get(self):
        data = [
            {'card_effect': 1,
             'target': 1,
             'power': 5.0,
             'range': 1.0}
        ]
        factory = APIRequestFactory()
        view = DescriptionGeneratorView.as_view()
        request = factory.post('/api/cards/descriptions/', data, format='json')
        response = view(request)

        self.assertEqual(200, response.status_code)


class ValidateEffectModifiersTestCase(TestCase):
    def test_validate_effect_modifiers1(self):
        """
        Scenario: Effect which should have modifiers is provided. Modifiers are not provided.
        Expected result: ValidationError is raised.
        """

        # Setup
        card_effect: CardEffect = CardEffect.objects.filter(has_modifier=True).first()
        power = None
        range_ = None

        # Assert there is some effect in database which should have modifiers.
        self.assertIsNotNone(card_effect)

        # Assert raises ValidationError
        self.assertRaises(serializers.ValidationError, validate_effect_modifiers, card_effect, power, range_)

    def test_validate_effect_modifiers2(self):
        """
        Scenario: Effect which should have modifiers is provided. Modifiers are provided.
        Expected result: ValidationError is not raised.
        """

        # Setup
        card_effect: CardEffect = CardEffect.objects.filter(has_modifier=True).first()
        power = 10
        range_ = 0.0

        # Assert there is some effect in database which should have modifiers.
        self.assertIsNotNone(card_effect)

        # Assert ValidationError is not raised
        validate_effect_modifiers(card_effect, power, range_)
