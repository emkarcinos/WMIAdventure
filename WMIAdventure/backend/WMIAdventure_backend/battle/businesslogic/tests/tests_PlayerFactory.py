from django.test import TestCase

from IngameUsers.businesslogic.experience.Experience import Experience
from .Creator import Creator
from ..PlayerFactory import PlayerFactory


class PlayerFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = PlayerFactory.get_instance()

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile = cls.creator.get_user_profile_models()[0]
        cls.cards = cls.creator.get_cards()

    def test_singleton(self):
        self.assertEqual(self.instance, PlayerFactory.get_instance())

    def test_creation(self):
        expected_level = Experience(
            self.user_profile.user_stats.exp
        ).level

        player = self.instance.create(user_profile_model=self.user_profile, is_attacker=False)

        self.assertEqual(player.id, self.user_profile.user.id)
        self.assertEqual(player.deck.get_card().card_model, self.cards[0])
        self.assertEqual(player.level, expected_level)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
