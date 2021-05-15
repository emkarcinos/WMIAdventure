from django.test import TestCase
from django.contrib.auth import get_user_model

from IngameUsers.models import UserProfile, Semester, UserCard, Deck, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect
from .Creator import Creator
from ..BattlePlayerFactory import BattlePlayerFactory


class BattlePlayerFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = BattlePlayerFactory.get_instance()

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile = cls.creator.get_user_profile_models()[0]
        cls.cards = cls.creator.get_cards()

    def test_singleton(self):
        self.assertEqual(self.instance, BattlePlayerFactory.get_instance())

    def test_creation(self):
        player = self.instance.create(user_profile_model=self.user_profile, is_attacker=False)

        self.assertEqual(player.id, self.user_profile.user.id)
        self.assertEqual(player.deck.get_card().card_model, self.cards[0])

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
