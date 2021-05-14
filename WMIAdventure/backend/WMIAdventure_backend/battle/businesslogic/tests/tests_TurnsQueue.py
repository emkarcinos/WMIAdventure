from unittest import TestCase

from IngameUsers.models import UserProfile
from users.models import User
from ..BattlePlayer import BattlePlayer
from ..TurnsQueue import TurnsQueue


class TurnsQueueTestCase(TestCase):
    def setUp(self) -> None:
        User.objects.all().delete()
        user_model1 = User.objects.create(
            username="user1",
            email="user1@company.com"
        )

        user_model2 = User.objects.create(
            username="user2",
            email="user2@company.com"
        )

        user_profile_model1 = UserProfile(user=user_model1, displayedUsername="user1")
        user_profile_model2 = UserProfile(user=user_model2, displayedUsername="user2")

        self.player1 = BattlePlayer(user_profile_model1)
        self.player2 = BattlePlayer(user_profile_model2)
        self.queue = TurnsQueue(self.player1, self.player2)

    def test_queue_looping(self):
        iterations = 5
        for _ in range(5):
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

