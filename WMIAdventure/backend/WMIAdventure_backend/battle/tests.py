from unittest.mock import patch

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate

from IngameUsers.factories import create_user_profile_with_deck
from IngameUsers.models import UserStats
from battle.businesslogic.tests.Creator import Creator
from users.models import User
from . import views
from .businesslogic.Deck import Deck
from .businesslogic.Outcome import Outcome
from .businesslogic.Player import Player
from .businesslogic.tests.factories import create_player_with_deck
from .serializers import *
from .signals import on_battle_end


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

        # Assert exp gain
        actual_exp_gain = serializer.data.get('exp_gain')
        self.assertEqual(actual_exp_gain, self.instance.attacker_exp_gain)

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

        # Assert exp gain
        actual_exp_gain = serializer.data.get('exp_gain')
        self.assertEqual(actual_exp_gain, self.instance.attacker_exp_gain)

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

        # Assert exp gain
        actual_exp_gain = serializer.data.get('exp_gain')
        self.assertEqual(actual_exp_gain, self.instance.attacker_exp_gain)

    def tearDown(self) -> None:
        # Reset players' hp
        self.attacker.statistics.hp = self.attacker.statistics.MAX_HP
        self.defender.statistics.hp = self.defender.statistics.MAX_HP

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()


class BattleViewTestCase(TestCase):
    def setUp(self) -> None:
        self.attacker_user = create_user_profile_with_deck()[0].user
        self.defender_user = create_user_profile_with_deck()[0].user

    def test_get1(self):
        """
        Scenario: User is present in the request, given user to attack exists in database.
        Expected result: Returned response with serialized battle outcome.
        """

        factory = APIRequestFactory()
        view = views.BattleView.as_view()

        # Create request
        test_request = factory.post(f'/api/battle/')
        # Authenticate attacker user
        force_authenticate(test_request, user=self.attacker_user)

        # Get response
        response = view(test_request, defender_id=self.defender_user.id)

        # Assert response attacker
        actual_attacker = response.data.get("outcome").get("attacker")
        self.assertEqual(actual_attacker.get("id"), self.attacker_user.id)

        # Assert response defender
        actual_defender = response.data.get("outcome").get("defender")
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


def _gen_not_existing_user_id():
    """
    Generates id of user that does not exist.

    :return: Id of user that does not exist.
    """
    not_existing_user_id = 0
    while len(User.objects.filter(pk=not_existing_user_id)) > 0:
        not_existing_user_id += 1
    return not_existing_user_id


class SignalsTestCase(TestCase):

    @patch('battle.signals.calculate_exp_gains')
    def test_on_battle_end(self, mock_calculate_exp_gains):
        """
        **Scenario:**

        - Battle Outcome exists, on_battle_end() is called

        ---

        **Expected result:**

        - Users gained proper amount of exp.
        """
        attacker, _ = create_player_with_deck()
        defender, _ = create_player_with_deck()
        outcome = Outcome(attacker, defender)

        attacker_exp_gain, defender_exp_gain = 3, 4
        attacker_stats = UserStats.objects.get(profile=attacker.id)
        defender_stats = UserStats.objects.get(profile=defender.id)

        expected_attacker_exp = attacker_stats.exp + attacker_exp_gain
        expected_defender_exp = defender_stats.exp + defender_exp_gain

        mock_calculate_exp_gains.return_value = (attacker_exp_gain, defender_exp_gain)

        on_battle_end(outcome)

        attacker_stats.refresh_from_db()
        defender_stats.refresh_from_db()
        self.assertEquals(attacker_stats.exp, expected_attacker_exp)
        self.assertEquals(defender_stats.exp, expected_defender_exp)

    def test_user_without_stats_gains_them(self):
        attacker, _ = create_player_with_deck()
        defender, _ = create_player_with_deck()
        outcome = Outcome(attacker, defender)

        attacker_profile = UserProfile.objects.get(pk=attacker.id)
        attacker_profile.user_stats.delete()

        on_battle_end(outcome)

        new_attacker_stats = attacker_profile.user_stats

        self.assertIsNotNone(new_attacker_stats)