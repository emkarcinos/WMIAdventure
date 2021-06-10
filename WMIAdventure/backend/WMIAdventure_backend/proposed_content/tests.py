from django.test import TestCase
from rest_framework import serializers, status
from rest_framework.test import APIRequestFactory

from cards.models import CardLevel, CardEffect
from proposed_content.models import ProposedCardInfo, ProposedCard, ProposedCardLevelEffects
from proposed_content.serializers import WholeProposedCardSerializer
from proposed_content.views import WholeProposedCardList, WholeProposedCardDetails


class WholeProposedCardSerializerTestCase(TestCase):
    def test_serialization(self):
        proposed_card_info = ProposedCardInfo.objects.create(name="Name", tooltip="Tooltip", subject=None)
        proposed_card_info.save()

        proposed_card1 = proposed_card_info.levels.create(level=CardLevel.objects.get(pk=1), next_level_cost=5)
        proposed_card1.effects.create(
            card_effect=CardEffect.objects.get(pk=1),
            power=5,
            range=1
        )

        proposed_card2 = proposed_card_info.levels.create(level=CardLevel.objects.get(pk=2), next_level_cost=6)
        proposed_card2.effects.create(
            card_effect=CardEffect.objects.get(pk=1),
            power=8,
            range=3
        )
        proposed_card2.effects.create(
            card_effect=CardEffect.objects.get(pk=2),
            power=5,
            range=2
        )

        serializer = WholeProposedCardSerializer(instance=proposed_card_info)

        for i, expected_card in enumerate(proposed_card_info.levels.all()):
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

        serializer = WholeProposedCardSerializer(data=data)

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

        serializer = WholeProposedCardSerializer(data=data)

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
        serializer = WholeProposedCardSerializer(data=data)

        self.assertFalse(serializer.is_valid())

        data['levels'][0]['next_level_cost'] = -5
        serializer = WholeProposedCardSerializer(data=data)

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
        serializer = WholeProposedCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Negative power
        data['levels'][0]['effects'][0]['power'] = -5
        serializer = WholeProposedCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Negative Range
        data['levels'][0]['effects'][0]['power'] = 10
        data['levels'][0]['effects'][0]['range'] = -5
        serializer = WholeProposedCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

        # Large Range
        data['levels'][0]['effects'][0]['range'] = 101
        serializer = WholeProposedCardSerializer(data=data)
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
        serializer = WholeProposedCardSerializer(data=data)

        serializer.is_valid()
        serializer.save()

        serializer = WholeProposedCardSerializer(data=data)
        self.assertFalse(serializer.is_valid())

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
        valid_serializer = WholeProposedCardSerializer(data=valid_data)
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
        invalid_serializer = WholeProposedCardSerializer(data=invalid_data)
        # Assert raises Validation Error
        self.assertRaises(serializers.ValidationError, invalid_serializer.is_valid, raise_exception=True)


class WholeProposedCardListTestCase(TestCase):
    def test_post1(self):
        """
        Scenario: POST request is made with correct data.
        Expected result: Proposed card is created correctly.
        """

        # Setup
        name = "masDASdk213aksd123Saad"

        # Assert proposed card name is not taken
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=name)

        # Setup
        effect_without_modifiers = CardEffect.objects.filter(has_modifier=False).first()
        effect_with_modifiers = CardEffect.objects.filter(has_modifier=True).first()

        # Assert exists data necessary to perform test
        self.assertIsNotNone(effect_without_modifiers)
        self.assertIsNotNone(effect_with_modifiers)

        # Setup
        data = \
            {
                'name': name,
                'tooltip': 'tooltip',
                'subject': 'WDI',
                'image': None,
                "levels": [
                    {
                        "level": 1,
                        "next_level_cost": 6,
                        "effects": [
                            {
                                "card_effect": effect_without_modifiers.id,
                                "target": 2,
                                "power": None,
                                "range": None
                            },
                            {
                                "card_effect": effect_with_modifiers.id,
                                "target": 2,
                                "power": 5,
                                "range": 3.0
                            }
                        ]
                    },
                    {
                        "level": 2,
                        "next_level_cost": None,
                        "effects": [
                            {
                                "card_effect": effect_without_modifiers.id,
                                "target": 2,
                                "power": None,
                                "range": None
                            },
                            {
                                "card_effect": effect_with_modifiers.id,
                                "target": 2,
                                "power": 50,
                                "range": 15.5
                            }
                        ]
                    }
                ]
            }

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardList.as_view()

        # Make POST request and get response
        request = factory.post('/api/proposed-content/cards/', data, format='json')
        response = view(request)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert proposed card was created
        created_card_info = ProposedCardInfo.objects.get(name=data.get("name"))
        self.assertIsNotNone(created_card_info)

        # Assert created card has proper data
        self.assertEqual(created_card_info.tooltip, data.get('tooltip'))
        self.assertEqual(created_card_info.subject, data.get('subject'))

        # Assert levels data
        card_lvl_data: ProposedCard
        for card_lvl_data, expected_data in zip(created_card_info.levels.all(), data.get("levels")):
            self.assertEqual(card_lvl_data.level.pk, expected_data.get("level"))
            self.assertEqual(card_lvl_data.next_level_cost, expected_data.get("next_level_cost"))

            # Assert effects data
            effect_data: ProposedCardLevelEffects
            for effect_data, expected_effect in zip(card_lvl_data.effects.all(), expected_data.get("effects")):
                self.assertEqual(effect_data.card_effect.pk, expected_effect.get("card_effect"))
                self.assertEqual(effect_data.power, expected_effect.get("power"))
                self.assertEqual(effect_data.range, expected_effect.get("range"))
                self.assertEqual(effect_data.target, expected_effect.get("target"))

    def test_post2(self):
        """
        Scenario: POST request is made with levels array provided, but empty.
        Expected result: Proposed card is not created, response status is 400 Bad Request.
        """

        # Setup
        name = "aksdlasdkml1213A"

        # Assert proposed card name is not taken
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=name)

        # Setup
        data = \
            {
                'name': name,
                'tooltip': 'tooltip',
                'subject': 'WDI',
                'image': None,
                "levels": []
            }

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardList.as_view()

        # Make POST request and get response
        request = factory.post('/api/proposed-content/cards/', data, format='json')
        response = view(request)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Assert proposed card wasn't created
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=data.get("name"))


class WholeProposedCardDetailsTestCase(TestCase):
    def test_get1(self):
        """
        Scenario: Proposed card is created in database. GET request is performed to view details of this card.
        Expected result: Response status code OK 200. Card returned in response has proper data.
        """

        # Setup

        name = "askdjkaj1213asd"

        effect_without_modifiers = CardEffect.objects.filter(has_modifier=False).first()
        effect_with_modifiers = CardEffect.objects.filter(has_modifier=True).first()

        # Assert proposed card name is not taken
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=name)

        # Assert effects data necessary to perform test exists
        self.assertIsNotNone(effect_without_modifiers)
        self.assertIsNotNone(effect_with_modifiers)

        # Setup continues

        card_info = ProposedCardInfo.objects.create(name=name, tooltip='tooltip', image=None, subject='subject')
        cards = [
            card_info.levels.create(
                level=CardLevel.objects.get(pk=1),
                next_level_cost=5
            ),
            card_info.levels.create(
                level=CardLevel.objects.get(pk=2),
                next_level_cost=None
            ),
        ]

        # Setup continues - add effect to 1 level of proposed card
        cards[0].effects.create(
            card_effect=effect_without_modifiers, power=None, range=None,
            target=ProposedCardLevelEffects.Target.OPPONENT
        )

        # Setup continues - add effect to 2 level of proposed card
        cards[1].effects.create(
            card_effect=effect_with_modifiers, power=10, range=5.0,
            target=ProposedCardLevelEffects.Target.OPPONENT
        )

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardDetails.as_view()

        # Make GET request and get response
        request = factory.get('/api/proposed-content/cards/')
        response = view(request, pk=card_info.pk)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert returned by response proposed card data is correct
        self.assertEqual(response.data.get('id'), card_info.pk)
        self.assertEqual(response.data.get('name'), card_info.name)
        self.assertEqual(response.data.get('subject'), card_info.subject)
        self.assertEqual(response.data.get('image'), card_info.image)
        self.assertEqual(response.data.get('tooltip'), card_info.tooltip)

        # Assert levels data is correct
        for level_data, expected_card in zip(response.data.get('levels'), cards):
            self.assertEqual(level_data.get('level'), expected_card.level.level)
            self.assertEqual(level_data.get('next_level_cost'), expected_card.next_level_cost)

            # Assert effects data is correct
            for effect_data, expected_effect in zip(level_data.get('effects'), expected_card.effects.all()):
                self.assertEqual(effect_data.get('card_effect'), expected_effect.card_effect.id)
                self.assertEqual(effect_data.get('power'), expected_effect.power)
                self.assertEqual(effect_data.get('range'), expected_effect.range)
                self.assertEqual(effect_data.get('target'), expected_effect.target)

        # Cleanup created test data
        card_info.delete()
