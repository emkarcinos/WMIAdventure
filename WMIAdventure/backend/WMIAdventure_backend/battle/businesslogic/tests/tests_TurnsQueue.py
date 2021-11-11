from django.test import TestCase

from IngameUsers.models import UserProfile
from .Creator import Creator
from ..PlayerFactory import PlayerFactory
from ..TurnsQueue import TurnsQueue


class TurnsQueueTestCase(TestCase):
    user_profile_model1: UserProfile
    user_profile_model2: UserProfile

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile_model1, cls.user_profile_model2 = cls.creator.get_user_profile_models()

    def setUp(self) -> None:
        factory = PlayerFactory.get_instance()
        self.player1 = factory.create(user_profile_model=self.user_profile_model1,
                                      is_attacker=True)
        self.player2 = factory.create(user_profile_model=self.user_profile_model2,
                                      is_attacker=False)
        self.queue = TurnsQueue(self.player1, self.player2)

    def test_queue_looping(self):
        iterations = 5
        for _ in range(iterations):
            first_player = self.queue.turn()
            self.assertEqual(first_player, self.player1)

            second_player = self.queue.turn()
            self.assertEqual(second_player, self.player2)

    def test_enqueue(self):
        self.queue.enqueue(self.player2)
        first_player = self.queue.turn()
        self.assertEqual(first_player, self.player1)

        second_player = self.queue.turn()
        self.assertEqual(second_player, self.player2)

        third_player = self.queue.turn()
        self.assertEqual(third_player, self.player2)

    def test_get_from_front_and_enqueue(self):
        expected_player = self.player1
        actual_player = self.queue._get_from_front_and_enqueue()

        self.assertIs(actual_player, expected_player)

        # Test if proper player is at the back of queue
        actual_player = self.queue.queue[-1]
        self.assertIs(actual_player, expected_player)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
