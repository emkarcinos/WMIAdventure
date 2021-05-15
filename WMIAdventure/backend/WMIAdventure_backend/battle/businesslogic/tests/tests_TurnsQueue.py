from django.test import TestCase

from IngameUsers.models import UserProfile, Deck, UserCard, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect
from users.models import User
from .Creator import Creator
from ..BattlePlayer import BattlePlayer
from ..BattlePlayerFactory import BattlePlayerFactory
from ..TurnsQueue import TurnsQueue


class TurnsQueueTestCase(TestCase):
    user_profile_model1: UserProfile
    user_profile_model2: UserProfile

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile_model1, cls.user_profile_model2 = cls.creator.get_user_profile_models()

    def setUp(self) -> None:
        factory = BattlePlayerFactory.get_instance()
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

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()