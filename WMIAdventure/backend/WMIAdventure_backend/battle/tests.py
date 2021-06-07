from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from users.models import User
from .businesslogic.Deck import Deck
from .businesslogic.Outcome import Outcome
from .businesslogic.Player import Player
from .serializers import *
from .businesslogic.tests import *
from battle.businesslogic.tests.Creator import Creator
from . import views


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


class OutcomeSerializerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.attacker_deck = Deck(cls.creator.get_attacker_deck(1))
        cls.defender_deck = Deck(cls.creator.get_defender_deck(2))

    def setUp(self) -> None:
        self.attacker = Player(1, self.attacker_deck)
        self.defender = Player(2, self.defender_deck)

        self.instance = Outcome(self.attacker, self.defender)
        self.instance.is_completed = True

    def test_serialization1(self):
        """
        Scenario: Attacker has 0 hp.
        Expected result: Defender is winner.
        """

        # Setup data
        self.attacker.statistics.hp = 0
        expected_winner = self.defender

        serializer = OutcomeSerializer(instance=self.instance)

        # Assert attacker
        serialized_attacker = serializer.data.get("attacker")
        self.assertEqual(serialized_attacker.get("id"), self.attacker.id)

        # Assert attacker statistics
        serialized_attacker_statistics = serialized_attacker.get("statistics")
        self.assertEqual(serialized_attacker_statistics.get("hp"), self.attacker.statistics.hp)
        self.assertEqual(serialized_attacker_statistics.get("armour"), self.attacker.statistics.armour)

        # Assert defender
        serialized_defender = serializer.data.get("defender")
        self.assertEqual(serialized_defender.get("id"), self.defender.id)

        # Assert defender statistics
        serialized_defender_statistics = serialized_defender.get("statistics")
        self.assertEqual(serialized_defender_statistics.get("hp"), self.defender.statistics.hp)
        self.assertEqual(serialized_defender_statistics.get("armour"), self.defender.statistics.armour)

        # Assert winner id
        actual_winner = serializer.data.get("winner")
        self.assertEqual(actual_winner, expected_winner.id)

    def test_serialization2(self):
        """
        Scenario: Attacker and defender have 0 hp.
        Expected result: There is no winner.
        """

        # Setup data
        self.attacker.statistics.hp = 0
        self.defender.statistics.hp = 0
        expected_winner = None

        serializer = OutcomeSerializer(instance=self.instance)

        # Assert attacker
        serialized_attacker = serializer.data.get("attacker")
        self.assertEqual(serialized_attacker.get("id"), self.attacker.id)

        # Assert attacker statistics
        serialized_attacker_statistics = serialized_attacker.get("statistics")
        self.assertEqual(serialized_attacker_statistics.get("hp"), self.attacker.statistics.hp)
        self.assertEqual(serialized_attacker_statistics.get("armour"), self.attacker.statistics.armour)

        # Assert defender
        serialized_defender = serializer.data.get("defender")
        self.assertEqual(serialized_defender.get("id"), self.defender.id)

        # Assert defender statistics
        serialized_defender_statistics = serialized_defender.get("statistics")
        self.assertEqual(serialized_defender_statistics.get("hp"), self.defender.statistics.hp)
        self.assertEqual(serialized_defender_statistics.get("armour"), self.defender.statistics.armour)

        # Assert winner id
        actual_winner = serializer.data.get("winner")
        self.assertEqual(actual_winner, expected_winner)

    def test_serialization3(self):
        """
        Scenario: Defender has 0 hp.
        Expected result: Attacker is winner.
        """

        # Setup data
        self.defender.statistics.hp = 0
        expected_winner = self.attacker

        serializer = OutcomeSerializer(instance=self.instance)

        # Assert attacker
        serialized_attacker = serializer.data.get("attacker")
        self.assertEqual(serialized_attacker.get("id"), self.attacker.id)

        # Assert attacker statistics
        serialized_attacker_statistics = serialized_attacker.get("statistics")
        self.assertEqual(serialized_attacker_statistics.get("hp"), self.attacker.statistics.hp)
        self.assertEqual(serialized_attacker_statistics.get("armour"), self.attacker.statistics.armour)

        # Assert defender
        serialized_defender = serializer.data.get("defender")
        self.assertEqual(serialized_defender.get("id"), self.defender.id)

        # Assert defender statistics
        serialized_defender_statistics = serialized_defender.get("statistics")
        self.assertEqual(serialized_defender_statistics.get("hp"), self.defender.statistics.hp)
        self.assertEqual(serialized_defender_statistics.get("armour"), self.defender.statistics.armour)

        # Assert winner id
        actual_winner = serializer.data.get("winner")
        self.assertEqual(actual_winner, expected_winner.id)

    def tearDown(self) -> None:
        # Reset players' hp
        self.attacker.statistics.hp = self.attacker.statistics.MAX_HP
        self.defender.statistics.hp = self.defender.statistics.MAX_HP

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()


class BattleViewTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.attacker_user, cls.defender_user = cls.creator.get_user_models()

    def test_get1(self):
        """
        Scenario: User is present in the request, given user to attack exists in database.
        Expected result: Returned response with serialized battle outcome.
        """

        factory = APIRequestFactory()
        view = views.BattleView.as_view()

        # Create request
        test_request = factory.get(f'/api/battle/')
        # Authenticate attacker user
        force_authenticate(test_request, user=self.attacker_user)

        # Get response
        response = view(test_request, defender_id=self.defender_user.id)

        # Assert response attacker
        actual_attacker = response.data.get("attacker")
        self.assertEqual(actual_attacker.get("id"), self.attacker_user.id)

        # Assert response defender
        actual_defender = response.data.get("defender")
        self.assertEqual(actual_defender.get("id"), self.defender_user.id)

    def test_get2(self):
        """
        Scenario: User is present in the request, given user to attack does not exist.
        Expected result: Returned 404.
        """
        not_existing_user_id = _gen_not_existing_user_id()

        factory = APIRequestFactory()
        view = views.BattleView.as_view()

        # Create request
        test_request = factory.get(f'/api/battle/')
        # Authenticate attacker user
        force_authenticate(test_request, user=self.attacker_user)

        # Get response
        response = view(test_request, defender_id=not_existing_user_id)

        # Assert 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()


def _gen_not_existing_user_id():
    """
    Generates id of user that does not exist.

    :return: Id of user that does not exist.
    """
    not_existing_user_id = 0
    while len(User.objects.filter(pk=not_existing_user_id)) > 0:
        not_existing_user_id += 1
    return not_existing_user_id
