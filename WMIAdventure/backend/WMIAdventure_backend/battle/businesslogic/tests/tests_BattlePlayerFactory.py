from django.test import TestCase
from django.contrib.auth import get_user_model

from IngameUsers.models import UserProfile, Semester, UserCard, Deck, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect
from ..BattlePlayerFactory import BattlePlayerFactory


class BattlePlayerFactoryTestCase(TestCase):
    def setUp(self) -> None:
        self.instance = BattlePlayerFactory.get_instance()

    @classmethod
    def setUpTestData(cls):
        super(TestCase, cls).setUpClass()

        user = get_user_model().objects.create(first_name='test',
                                               is_staff=True,
                                               is_superuser=True,
                                               last_name='test',
                                               username='test',
                                               password='test',
                                               email="sdaa2@osa.com")
        user.save()

        cls.user_profile = UserProfile.objects.create(user=user,
                                                      semester=Semester(1))
        cls.user_profile.save()
        cls.cards = []
        # Creating 5 test cards
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
            cls.cards.append(card)

        deck = Deck()
        for i in range(len(cls.cards)):
            card = UserCard.objects.create(user_profile=cls.user_profile,
                                           card=cls.cards[i])
            card.save()
            # Sorry for this eval function call, this will fail if we modified field names in Deck model
            exec("deck.card{} = card".format(i + 1))
        deck.save()

        user_deck = UserDeck(deck_number=1,
                             deck=deck,
                             user_profile=cls.user_profile)
        user_deck.save()

    def test_singleton(self):
        self.assertEqual(self.instance, BattlePlayerFactory.get_instance())

    def test_creation(self):
        player = self.instance.create(user_profile_model=self.user_profile, is_attacker=False)

        self.assertEqual(player.id, self.user_profile.user.id)
        self.assertEqual(player.deck.get_card(), self.cards[0])
