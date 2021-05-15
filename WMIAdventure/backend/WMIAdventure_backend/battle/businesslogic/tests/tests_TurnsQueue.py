from django.test import TestCase

from IngameUsers.models import UserProfile, Deck, UserCard, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect
from users.models import User
from ..BattlePlayer import BattlePlayer
from ..BattlePlayerFactory import BattlePlayerFactory
from ..TurnsQueue import TurnsQueue


class TurnsQueueTestCase(TestCase):
    user_profile_model1: UserProfile
    user_profile_model2: UserProfile

    @classmethod
    def setUpTestData(cls):
        User.objects.all().delete()
        user_model1 = User.objects.create(
            username="user1",
            email="user1@company.com"
        )

        user_model2 = User.objects.create(
            username="user2",
            email="user2@company.com"
        )

        cls.user_profile_model1 = UserProfile(user=user_model1, displayedUsername="user1")
        cls.user_profile_model2 = UserProfile(user=user_model2, displayedUsername="user2")
        cls.user_profile_model1.save()
        cls.user_profile_model2.save()
        # Creating 5 test cards
        cards = []
        for i in range(5):
            card_info = CardInfo.objects.create(
                name=str(i),
                tooltip="Tooltip",
                image=None,
                subject=None
            )
            card_info.save()

            card = Card.objects.create(
                info=card_info,
                level=CardLevel.objects.get(pk=1),
                next_level_cost=None
            )

            effect = CardLevelEffects.objects.create(card=card,
                                                     card_effect=CardEffect(CardEffect.EffectId.DMG),
                                                     target=CardLevelEffects.Target.OPPONENT,
                                                     power=1.0,
                                                     range=1.0)
            effect.save()
            card.save()
            cards.append(card)

        # Decks used by Player 1
        p1_attacker_deck = Deck()
        p1_defender_deck = Deck()

        # Decks used by Player 2
        p2_attacker_deck = Deck()
        p2_defender_deck = Deck()

        for i in range(len(cards)):
            # Creating a card that belongs to P1
            p1_card = UserCard.objects.create(user_profile=cls.user_profile_model1,
                                              card=cards[i])
            # The same card also belongs to P2
            p2_card = UserCard.objects.create(user_profile=cls.user_profile_model2,
                                              card=cards[i])
            p1_card.save()
            p2_card.save()
            # Sorry for this eval function call, this will fail if we modified field names in Deck model
            # Adding p1's cards to each deck (attacker and defender decks are the same here)
            exec("p1_attacker_deck.card{} = p1_card".format(i + 1))
            exec("p1_defender_deck.card{} = p1_card".format(i + 1))
            # Same for p2
            exec("p2_attacker_deck.card{} = p2_card".format(i + 1))
            exec("p2_defender_deck.card{} = p2_card".format(i + 1))

        p1_attacker_deck.save()
        p1_defender_deck.save()

        # Decks used by Player 2
        p2_attacker_deck.save()
        p2_defender_deck.save()

        user1_deck1 = UserDeck(deck_number=1,
                               deck=p1_defender_deck,
                               user_profile=cls.user_profile_model1)
        user1_deck1.save()
        user1_deck2 = UserDeck(deck_number=2,
                               deck=p1_attacker_deck,
                               user_profile=cls.user_profile_model1)
        user1_deck2.save()
        user2_deck1 = UserDeck(deck_number=1,
                               deck=p2_defender_deck,
                               user_profile=cls.user_profile_model2)
        user2_deck1.save()
        user2_deck2 = UserDeck(deck_number=2,
                               deck=p2_attacker_deck,
                               user_profile=cls.user_profile_model2)
        user2_deck2.save()

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
