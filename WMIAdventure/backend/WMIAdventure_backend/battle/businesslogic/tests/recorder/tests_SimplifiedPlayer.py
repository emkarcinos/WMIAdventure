from unittest import TestCase

from battle.businesslogic.PlayerFactory import PlayerFactory
from battle.businesslogic.recorder.SimplifiedPlayer import SimplifiedPlayer
from battle.businesslogic.tests.Creator import Creator


class SimplifiedPlayerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()
        cls.profiles = cls.creator.get_user_profile_models()
        cls.player = PlayerFactory.get_instance().create(cls.profiles[0])

    def test_creation(self):
        new_object = SimplifiedPlayer(self.player)

        self.assertEqual(new_object.player_id, self.player.id)
        self.assertEqual(new_object.stats.hp, self.player.get_hp())
        for i in range(len(new_object.deck.cards)):
            self.assertEqual(new_object.deck.cards[i].card_info_id, self.player.deck.cards_queue[i].card_model.id)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
