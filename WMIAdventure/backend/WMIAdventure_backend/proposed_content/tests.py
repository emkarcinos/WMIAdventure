from django.test import TestCase
from rest_framework import serializers, status
from rest_framework.test import APIRequestFactory, force_authenticate

from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.businesslogic.description_generator.DescriptionGenerator import DescriptionGenerator
from cards.models import CardLevel, CardEffect, CardInfo, CardLevelEffects, Card
from proposed_content.models import ProposedCardInfo, ProposedCard, ProposedCardLevelEffects
from proposed_content.serializers import WholeProposedCardSerializer
from proposed_content.views import WholeProposedCardList, WholeProposedCardDetails, AcceptProposedCardView
from users.models import User


class WholeProposedCardSerializerTestCase(TestCase):
    def test_serialization(self):
        proposed_card_info = ProposedCardInfo.objects.create(name="Name",
                                                             tooltip="Tooltip",
                                                             subject=None,
                                                             comment="comment")
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
                "comment": "komentarz",
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
        self.assertEqual(card_info.comment, data["comment"])

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
        """
        Test that you can create proposed cards with the same names.
        """
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
        self.assertTrue(serializer.is_valid())

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
    def setUp(self) -> None:
        self.staff_user = User.objects.create(username='staffuser', is_staff=True)

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

        # EffectFactory will be used to create Effect objects.
        # Effect objects will be used to generate expected effects_description
        effect_factory = EffectFactory.get_instance()

        # DescriptionGenerator will be used to generate expected effects_description
        description_generator = DescriptionGenerator.get_instance()

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardList.as_view()

        # Make POST request and get response
        request = factory.post('/api/proposed-content/cards/', data, format='json')

        force_authenticate(request=request, user=self.staff_user)
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

            # Assert effects_description after effects data has been asserted
            effects_list = [effect_factory.create(effect_model) for effect_model in card_lvl_data.effects.all()]
            expected_effects_description = description_generator.generate_description(effects_list)
            self.assertEqual(card_lvl_data.effects_description, expected_effects_description)

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

        force_authenticate(request=request, user=self.staff_user)
        response = view(request)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Assert proposed card wasn't created
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=data.get("name"))


class WholeProposedCardDetailsTestCase(TestCase):
    def setUp(self) -> None:
        self.staff_user = User.objects.create(username='staffuser', is_staff=True)

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
        force_authenticate(request=request, user=self.staff_user)
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

    def test_get2(self):
        """
        Scenario: GET request is performed to view details of non existing card.
        Expected result: Response status code 404 Not Found.
        """

        # Setup

        id_ = 91238

        # Assert there is no proposed card with id in database
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, pk=id_)

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardDetails.as_view()

        # Make GET request and get response
        request = factory.get('/api/proposed-content/cards/')
        force_authenticate(request=request, user=self.staff_user)
        response = view(request, pk=id)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put1(self):
        """
        Scenario: Proposed card is created in database. PUT request is made to update data of this card.
        Expected result: Proposed card has updated data.
        """

        # Setup

        name = "aasdaskdjkaj1213asd"

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

        # Setup update data

        update_data = \
            {
                'name': name + 'NEW NAME',  # Update name
                'tooltip': card_info.tooltip + 'NEW TOOLTIP',  # Update tooltip
                'subject': card_info.subject,
                'levels': [
                    # Update Level 1
                    {
                        'level': 1,
                        'next_level_cost': cards[0].next_level_cost + 3,  # Update next level cost
                        'effects': [
                            {
                                'card_effect': effect_without_modifiers.id,
                                'power': None,
                                'range': None,
                                'target': ProposedCardLevelEffects.Target.PLAYER  # Update target
                            }
                        ]
                    },
                    # Update Level 2
                    {
                        'level': 2,
                        'next_level_cost': 13,  # Add next level cost (before was None)
                        'effects': [
                            {
                                'card_effect': effect_with_modifiers.id,
                                'power': cards[1].effects.first().power + 3,  # Update power
                                'range': cards[1].effects.first().range + 2.5,  # Update range
                                'target': ProposedCardLevelEffects.Target.OPPONENT
                            }
                        ]
                    },
                    # Add new Level - Level 3
                    {
                        'level': 3,
                        'next_level_cost': None,
                        'effects': [
                            {
                                'card_effect': effect_with_modifiers.id,
                                'power': 13,
                                'range': 2.1,
                                'target': ProposedCardLevelEffects.Target.OPPONENT
                            }
                        ]
                    }
                ]
            }

        # Setup request
        factory = APIRequestFactory()
        view = WholeProposedCardDetails.as_view()

        # Make PUT request and get response
        request = factory.put('/api/proposed-content/cards/', update_data, format='json')

        force_authenticate(request=request, user=self.staff_user)
        response = view(request, pk=card_info.pk)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Fetch updated card from database
        card_info = ProposedCardInfo.objects.get(pk=card_info.pk)

        # Assert card in database is updated
        self.assertEqual(update_data.get('name'), card_info.name)
        self.assertEqual(update_data.get('tooltip'), card_info.tooltip)

        # Assert levels data is correct
        for level_data, expected_card in zip(update_data.get('levels'), card_info.levels.all()):
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


class AcceptProposedCardViewTestCase(TestCase):
    def test_post1(self):
        """
        Scenario: Proposed card exists, there is no accepted card with the same name as this proposed card.
        Expected result: Accepted card is created with the same data as proposed card. Proposed card is deleted.
            Response status is 201 Created.
        """

        proposed_card, proposed_card_data, factory, view, effect_factory, description_generator = \
            self.setup_test_post1()

        # Make POST request and get response
        request = factory.post('/api/cards//accept/')
        response = view(request, pk=proposed_card.pk)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert proposed card is deleted
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=proposed_card_data['name'])

        # Assert accepted card was created with proper data
        accepted_card: CardInfo = CardInfo.objects.get(name=proposed_card_data['name'])

        self.assertEqual(accepted_card.name, proposed_card_data['name'])
        self.assertEqual(accepted_card.tooltip, proposed_card_data['tooltip'])
        self.assertEqual(accepted_card.subject, proposed_card_data['subject'])

        # Assert levels data is correct
        accepted_card_level: Card
        for accepted_card_level, expected_level_data in zip(accepted_card.levels.all(), proposed_card_data['levels']):
            self.assertEqual(accepted_card_level.level, expected_level_data['level'])
            self.assertEqual(accepted_card_level.next_level_cost, expected_level_data['next_level_cost'])

            # Assert effects data is correct
            level_effect: CardLevelEffects
            for level_effect, expected_effect_data in zip(accepted_card_level.effects.all(),
                                                          expected_level_data['effects']):
                self.assertEqual(level_effect.card_effect, expected_effect_data['card_effect'])
                self.assertEqual(level_effect.power, expected_effect_data['power'])
                self.assertEqual(level_effect.range, expected_effect_data['range'])
                self.assertEqual(level_effect.target, expected_effect_data['target'])

            # Assert effects_description after effects data has been asserted
            effects_list = [effect_factory.create(effect_model) for effect_model in accepted_card_level.effects.all()]
            expected_effects_description = description_generator.generate_description(effects_list)
            self.assertEqual(accepted_card_level.effects_description, expected_effects_description)

        # Cleanup created test data
        accepted_card.delete()

    def test_post2(self):
        """
        Scenario: Proposed card exists and there is accepted card with the same name as this proposed card.
        Expected result: Accepted card is updated with data from proposed card. Proposed card is deleted.
            Response status is 200 Ok.
        """

        accepted_card, proposed_card, proposed_card_data, factory, view, effect_factory, description_generator \
            = self.setup_test_post2()

        # Make POST request and get response
        request = factory.post('/api/cards//accept/')
        response = view(request, pk=proposed_card.pk)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert proposed card is deleted
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=proposed_card_data['name'])

        # Fetch updated accepted card from database
        accepted_card = CardInfo.objects.get(pk=accepted_card.pk)

        # Assert accepted was updated with proper data
        self.assertEqual(accepted_card.name, proposed_card_data['name'])
        self.assertEqual(accepted_card.tooltip, proposed_card_data['tooltip'])
        self.assertEqual(accepted_card.subject, proposed_card_data['subject'])

        # Assert levels data is correct
        accepted_card_level: Card
        for accepted_card_level, expected_level_data in zip(accepted_card.levels.all(), proposed_card_data['levels']):
            self.assertEqual(accepted_card_level.level, expected_level_data['level'])
            self.assertEqual(accepted_card_level.next_level_cost, expected_level_data['next_level_cost'])

            # Assert effects data is correct
            level_effect: CardLevelEffects
            for level_effect, expected_effect_data in zip(accepted_card_level.effects.all(),
                                                          expected_level_data['effects']):
                self.assertEqual(level_effect.card_effect, expected_effect_data['card_effect'])
                self.assertEqual(level_effect.power, expected_effect_data['power'])
                self.assertEqual(level_effect.range, expected_effect_data['range'])
                self.assertEqual(level_effect.target, expected_effect_data['target'])

            # Assert effects_description after effects data has been asserted
            effects_list = [effect_factory.create(effect_model) for effect_model in accepted_card_level.effects.all()]
            expected_effects_description = description_generator.generate_description(effects_list)
            self.assertEqual(accepted_card_level.effects_description, expected_effects_description)

        # Cleanup created test data
        accepted_card.delete()

    def test_post3(self):
        """
        Scenario: Proposed card does not exist.
        Expected result: Response status is 404 Not Found.
        """

        not_existing_proposed_card_id = 9122301203

        # Assert there is no proposed card with given id
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, pk=not_existing_proposed_card_id)

        # Setup request
        factory = APIRequestFactory()
        view = AcceptProposedCardView.as_view()

        # Make POST request and get response
        request = factory.post('/api/cards//accept/')
        response = view(request, pk=not_existing_proposed_card_id)

        # Assert response status code
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def setup_test_post1(self):
        # Setup - Create proposed card.

        name = "123123123123123123"

        # Assert proposed card name is not taken
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=name)

        # Assert there is no accepted card with proposed card's name
        self.assertRaises(CardInfo.DoesNotExist, CardInfo.objects.get, name=name)

        # Setup - proposed card's effects data

        effect_without_modifiers = CardEffect.objects.filter(has_modifier=False).first()
        effect_with_modifiers = CardEffect.objects.filter(has_modifier=True).first()

        # Assert effects data necessary to perform test exists
        self.assertIsNotNone(effect_without_modifiers)
        self.assertIsNotNone(effect_with_modifiers)

        # Setup continues

        proposed_card_data = {
            'name': name,
            'tooltip': 'tooltip',
            'subject': 'subject',
            'levels': [
                {
                    'level': CardLevel.objects.get(pk=1),
                    'next_level_cost': 5,
                    'effects': [
                        {
                            'card_effect': effect_without_modifiers,
                            'power': None,
                            'range': None,
                            'target': ProposedCardLevelEffects.Target.OPPONENT
                        }
                    ]
                },
                {
                    'level': CardLevel.objects.get(pk=2),
                    'next_level_cost': None,
                    'effects': [
                        {
                            'card_effect': effect_with_modifiers,
                            'power': 10,
                            'range': 9.9,
                            'target': ProposedCardLevelEffects.Target.OPPONENT
                        }
                    ]
                }
            ]
        }

        # EffectFactory will be used to create Effect objects.
        # Effect objects will be used to generate expected effects_description
        effect_factory = EffectFactory.get_instance()

        # DescriptionGenerator will be used to generate expected effects_description
        description_generator = DescriptionGenerator.get_instance()

        # Create all proposed card models with proposed card data

        proposed_card = ProposedCardInfo.objects.create(name=proposed_card_data['name'],
                                                        tooltip=proposed_card_data['tooltip'],
                                                        subject=proposed_card_data['subject'])

        for levels_data in proposed_card_data['levels']:
            proposed_card_level = proposed_card.levels.create(
                level=levels_data['level'],
                next_level_cost=levels_data['next_level_cost']
            )

            for effects_data in levels_data['effects']:
                proposed_card_level.effects.create(
                    card_effect=effects_data['card_effect'],
                    power=effects_data['power'],
                    range=effects_data['range'],
                    target=effects_data['target']
                )

        # Setup request
        factory = APIRequestFactory()
        view = AcceptProposedCardView.as_view()

        return proposed_card, proposed_card_data, factory, view, effect_factory, description_generator

    def setup_test_post2(self):
        # Setup - Create proposed card.

        name = "123123123123123123"

        # Assert proposed card name is not taken
        self.assertRaises(ProposedCardInfo.DoesNotExist, ProposedCardInfo.objects.get, name=name)

        # Assert accepted card name is not taken
        self.assertRaises(CardInfo.DoesNotExist, CardInfo.objects.get, name=name)

        # Setup - proposed and accepted cards' effects data

        effect_without_modifiers = CardEffect.objects.filter(has_modifier=False).first()
        effect_with_modifiers = CardEffect.objects.filter(has_modifier=True).first()

        # Assert effects data necessary to perform test exists
        self.assertIsNotNone(effect_without_modifiers)
        self.assertIsNotNone(effect_with_modifiers)

        # Create accepted card data
        accepted_card_data = {
            'name': name,
            'tooltip': 'tooltip',
            'subject': 'subject',
            'levels': [
                {
                    'level': CardLevel.objects.get(pk=1),
                    'next_level_cost': 5,
                    'effects': [
                        {
                            'card_effect': effect_without_modifiers,
                            'power': None,
                            'range': None,
                            'target': ProposedCardLevelEffects.Target.OPPONENT
                        }
                    ]
                },
                {
                    'level': CardLevel.objects.get(pk=2),
                    'next_level_cost': None,
                    'effects': [
                        {
                            'card_effect': effect_with_modifiers,
                            'power': 10,
                            'range': 9.9,
                            'target': ProposedCardLevelEffects.Target.OPPONENT
                        }
                    ]
                }
            ]
        }

        # Setup continues

        # EffectFactory will be used to create Effect objects.
        # Effect objects will be used to generate expected effects_description
        effect_factory = EffectFactory.get_instance()

        # DescriptionGenerator will be used to generate expected effects_description
        description_generator = DescriptionGenerator.get_instance()

        # Create all proposed card models with proposed card data
        accepted_card = CardInfo.objects.create(name=accepted_card_data['name'],
                                                tooltip=accepted_card_data['tooltip'],
                                                subject=accepted_card_data['subject'])

        for levels_data in accepted_card_data['levels']:
            proposed_card_level = accepted_card.levels.create(
                level=levels_data['level'],
                next_level_cost=levels_data['next_level_cost']
            )

            for effects_data in levels_data['effects']:
                proposed_card_level.effects.create(
                    card_effect=effects_data['card_effect'],
                    power=effects_data['power'],
                    range=effects_data['range'],
                    target=effects_data['target']
                )

        # Create proposed card data
        proposed_card_data = {
            'name': name,
            'tooltip': accepted_card_data['tooltip'] + 'CHANGED',
            'subject': accepted_card_data['subject'] + 'CHANGED',
            'levels': [
                {
                    'level': CardLevel.objects.get(pk=1),
                    'next_level_cost': accepted_card_data['levels'][0]['next_level_cost'] + 3,
                    'effects': [
                        {
                            'card_effect': effect_without_modifiers,
                            'power': None,
                            'range': None,
                            'target': ProposedCardLevelEffects.Target.PLAYER
                        }
                    ]
                },
                {
                    'level': CardLevel.objects.get(pk=2),
                    'next_level_cost': 13,
                    'effects': [
                        {
                            'card_effect': effect_with_modifiers,
                            'power': 99,
                            'range': 31,
                            'target': ProposedCardLevelEffects.Target.PLAYER
                        }
                    ]
                },
                {
                    'level': CardLevel.objects.get(pk=3),
                    'next_level_cost': None,
                    'effects': [
                        {
                            'card_effect': effect_without_modifiers,
                            'power': None,
                            'range': None,
                            'target': ProposedCardLevelEffects.Target.OPPONENT
                        },
                        {
                            'card_effect': effect_with_modifiers,
                            'power': 100,
                            'range': 51.34,
                            'target': ProposedCardLevelEffects.Target.PLAYER
                        }
                    ]
                }
            ]
        }

        # Create all proposed card models with proposed card data
        proposed_card = ProposedCardInfo.objects.create(name=proposed_card_data['name'],
                                                        tooltip=proposed_card_data['tooltip'],
                                                        subject=proposed_card_data['subject'])

        for levels_data in proposed_card_data['levels']:
            proposed_card_level = proposed_card.levels.create(
                level=levels_data['level'],
                next_level_cost=levels_data['next_level_cost']
            )

            for effects_data in levels_data['effects']:
                proposed_card_level.effects.create(
                    card_effect=effects_data['card_effect'],
                    power=effects_data['power'],
                    range=effects_data['range'],
                    target=effects_data['target']
                )

        # Setup request
        factory = APIRequestFactory()
        view = AcceptProposedCardView.as_view()

        return accepted_card, proposed_card, proposed_card_data, factory, view, effect_factory, description_generator
