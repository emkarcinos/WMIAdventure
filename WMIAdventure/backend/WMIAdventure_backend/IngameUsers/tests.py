from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIRequestFactory, APIClient

from battle.businesslogic.tests.Creator import Creator
from cards.factories import create_card_with_effect, CardFactory, CardInfoFactory, create_card_with_effects, EffectData
from cards.models import Card, CardInfo, CardLevel, CardEffect, CardLevelEffects
from . import views
from .businesslogic.experience.Experience import Experience
from .businesslogic.skill_points import calculate_skill_points_gain
from .factories import create_user_profile_with_deck, UserProfileFactory
from .models import UserProfile, Semester, UserCard, Deck, UserDeck, UserStats
from .serializers import UserDecksSerializer, DeckSerializer, UserProfileSerializer, UserStatsSerializer
from .signals import on_user_create, user_should_gain_exp, user_gained_exp, _give_all_not_owned_cards_to_user


class UserProfileTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_user = get_user_model().objects.create_user(username='testusername', password='12345')

    def setUp(self) -> None:
        self.test_username = "testuser"
        self.semester = 5
        self.user_profile = UserProfile.objects.create(user=self.test_user,
                                                       displayedUsername=self.test_username,
                                                       semester=Semester.objects.get(pk=5))

    def tearDown(self) -> None:
        self.user_profile.delete()

    def testApiGet(self):
        factory = APIRequestFactory()
        view = views.PaginatedUsersView.as_view()
        testRequest = factory.get('/api/userprofiles/?pagesize=50000')
        response = view(testRequest)

        # Assert user in returned users list.
        user_ids = [user_data["user"] for user_data in response.data['results']]
        self.assertTrue(self.test_user.id in user_ids)

        # Assert user has correct data
        for user_data in response.data['results']:
            if user_data["user"] == self.test_user.id:
                self.assertEqual(self.test_username, user_data['displayedUsername'])
                self.assertEqual(self.semester, user_data['semester'])

    def testApiPost(self):
        # Setup test view
        factory = APIRequestFactory()
        view = views.PaginatedUsersView.as_view()
        fetchView = views.UserView.as_view()

        # Create data needed to create new UserProfile
        new_user = get_user_model().objects.create_user(username="asdasa", password="129312")
        new_username = "test2"
        new_semester = 5

        # Make post request to create new UserProfile
        result = factory.post('/api/userprofiles', data={'user': new_user.id,
                                                         'displayedUsername': new_username,
                                                         'semester': new_semester}, format='json')
        view(result)

        # Make GET request to check if newly created UserProfile exists.
        testRequest = factory.get(f'/api/userprofiles/')
        response = fetchView(testRequest, pk=new_user.id)

        # Assert that UserProfile returned by GET has correct data.
        self.assertEqual(new_user.id, response.data['user'])
        self.assertEqual(new_username, response.data['displayedUsername'])
        self.assertEqual(new_semester, response.data['semester'])

    @classmethod
    def tearDownClass(cls):
        cls.test_user.delete()


class UserViewTestCase(TestCase):
    def setUp(self) -> None:
        self.user_profile = UserProfileFactory()
        self.client = APIClient()
        self.client.force_authenticate(self.user_profile.user)

    @staticmethod
    def _get_url(user_profile: UserProfile):
        return f'/api/user-profiles/{user_profile.user.id}/'

    def test_get_and_profile_owner(self):
        """
        **Scenario:**

        - Authenticated user wants to view his profile, makes GET request to view.

        ---

        **Expected result:**

        - Response status is 200 OK and it contains all his data.
        """

        response = self.client.get(UserViewTestCase._get_url(self.user_profile))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert response data contains info about skill_points (it can only be seen by profile owner)
        self.assertIsNotNone(response.data.get('skill_points', None))

    def test_get_and_not_profile_owner(self):
        """
        **Scenario:**

        - Authenticated user wants to view other user's profile, makes GET request to view.

        ---

        **Expected result:**

        - Response status is 200 OK and it contains subset of user's data.
        """

        other_user_profile = UserProfileFactory()
        response = self.client.get(UserViewTestCase._get_url(other_user_profile))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert response data doesn't contain info about skill_points (it can be seen only by profile owner)
        self.assertIsNone(response.data.get('skill_points', None))


class UserCardTestCase(TestCase):
    def test_assigning(self):
        card = Card()
        user_profile = UserProfile()
        user_card = UserCard(user_profile=user_profile,
                             card=card)

        self.assertEqual(user_card.card, card)
        self.assertEqual(user_card.user_profile, user_profile)

    def test_unique_constraint(self):
        u1 = UserProfile(user=get_user_model().objects.create_user(username="test"),
                         displayedUsername="test")
        u1.save()

        info = CardInfo.objects.create()
        level = CardLevel.objects.get(pk=1)
        card1 = Card.objects.create(info=info,
                                    level=level)
        # Creating first user_card
        UserCard.objects.create(user_profile=u1, card=card1)
        # Second user_card with the same card and user should raise
        c2 = UserCard(user_profile=u1, card=card1)
        self.assertRaises(IntegrityError, c2.save)


class DeckTestCase(TestCase):
    def test_assigning(self):
        card1 = UserCard()
        card2 = UserCard()
        card3 = UserCard()
        card4 = UserCard()
        card5 = UserCard()

        deck = Deck(card1=card1,
                    card2=card2,
                    card3=card3,
                    card4=card4,
                    card5=card5)

        self.assertIs(deck.card1, card1)
        self.assertIs(deck.card2, card2)
        self.assertIs(deck.card3, card3)
        self.assertIs(deck.card4, card4)
        self.assertIs(deck.card5, card5)

    def test_unique_constraint(self):
        u1 = UserProfile(user=get_user_model().objects.create_user(username="test"),
                         displayedUsername="test")
        u1.save()

        info = CardInfo.objects.create()
        level = CardLevel.objects.get(pk=1)
        card1 = Card.objects.create(info=info,
                                    level=level)
        # Creating first user_card
        card = UserCard.objects.create(user_profile=u1, card=card1)

        deck = Deck.objects.create(card1=card,
                                   card2=card,
                                   card3=card,
                                   card4=card,
                                   card5=card)

        UserDeck.objects.create(deck_number=1,
                                deck=deck,
                                user_profile=u1)
        failing_deck = UserDeck(deck_number=1, deck=deck, user_profile=u1)
        self.assertRaises(IntegrityError, failing_deck.save)


class UserDecksSerializerTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

    def test_serialization(self):
        user = self.creator.get_user_profile_models()[0]
        serializer = UserDecksSerializer(user)
        data = serializer.data.get('user_decks')

        # We get a first deck from the created user
        actual_deck1 = user.user_decks.all()[0]
        self.assertEqual(data[0]['deck_number'], actual_deck1.deck_number)
        # We check selected two cards
        self.assertEqual(data[0]['card1']['id'], actual_deck1.deck.card1.card.info.id)
        self.assertEqual(data[0]['card1']['level'], actual_deck1.deck.card1.card.level.level)
        self.assertEqual(data[0]['card3']['id'], actual_deck1.deck.card3.card.info.id)
        self.assertEqual(data[0]['card3']['level'], actual_deck1.deck.card3.card.level.level)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()


class DeckSerializerTestCase(TestCase):

    def setUp(self) -> None:
        self.user_profile, self.deck = create_user_profile_with_deck()

    def test_serialization(self):
        """
        **Scenario:**

        - Deck instance exists, we serialize it.

        ---

        **Expected result:**

        - Serialized data is correct.
        """

        serializer = DeckSerializer(instance=self.deck)
        for i in range(1, 6):
            card_data = serializer.data[f'card{i}']
            card_from_deck = getattr(self.deck, f'card{i}').card
            self.assertEquals(card_data['id'], card_from_deck.info.id)
            self.assertEqual(card_data['level'], card_from_deck.level.level)

    def test_update(self):
        """
        **Scenario:**

        - A: We try to update deck with new card, but deck owner is not owner of this card.

        - B: We try to update deck with new card, deck owner is owner of this card.

        ---

        **Expected result:**

        - A: Validation Error is raised, because deck owner is not owner of the card.

        - B: Deck is updated properly.
        """

        # Create data to update deck with new card
        new_card1 = create_card_with_effect()
        data = {
            "card1": {
                "id": new_card1.info.id, "level": new_card1.level.level
            },
            "card2": {
                "id": self.deck.card2.card.info.id, "level": self.deck.card2.card.level.level
            },
            "card3": {
                "id": self.deck.card3.card.info.id, "level": self.deck.card3.card.level.level
            },
            "card4": {
                "id": self.deck.card4.card.info.id, "level": self.deck.card4.card.level.level
            },
            "card5": {
                "id": self.deck.card5.card.info.id, "level": self.deck.card5.card.level.level
            }
        }

        # Try to update deck with serializer when deck owner is not owner of the card
        serializer = DeckSerializer(instance=self.deck, data=data)
        self.assertRaises(ValidationError, serializer.is_valid, raise_exception=True)

        # Make deck owner owner of created card and try to update deck again
        self.user_profile.user_cards.create(card=new_card1)
        serializer = DeckSerializer(instance=self.deck, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Assert deck is updated
        self.deck.refresh_from_db()
        self.assertEqual(new_card1.info, self.deck.card1.card.info)
        self.assertEqual(new_card1.level, self.deck.card1.card.level)

    def test_update_with_card_which_does_not_exist(self):
        """
        **Scenario:**

        - A: We try to update deck with card that does not exist

        ---

        **Expected result:**

        - A: Validation Error is raised, because card does not exist.
        """

        data = {
            "card1": {
                "id": 999, "level": 999
            },
            "card2": {
                "id": self.deck.card2.card.info.id, "level": self.deck.card2.card.level.level
            },
            "card3": {
                "id": self.deck.card3.card.info.id, "level": self.deck.card3.card.level.level
            },
            "card4": {
                "id": self.deck.card4.card.info.id, "level": self.deck.card4.card.level.level
            },
            "card5": {
                "id": self.deck.card5.card.info.id, "level": self.deck.card5.card.level.level
            }
        }

        # Try to update deck with serializer
        serializer = DeckSerializer(instance=self.deck, data=data)
        self.assertRaises(ValidationError, serializer.is_valid, raise_exception=True)


class UserDeckViewTestCase(TestCase):

    def setUp(self) -> None:
        self.user_profile, self.deck = create_user_profile_with_deck()

        self.client = APIClient()
        self.client.force_authenticate(user=self.user_profile.user)

        self.url = f'/api/user-profiles/{self.user_profile.user.id}/decks/{self.deck.userdeck.deck_number}/'

    def test_retrieve(self):
        response = self.client.get(self.url)

        for i in range(1, 6):
            card_data = response.data[f'card{i}']
            card_from_deck = getattr(self.deck, f'card{i}').card
            self.assertEquals(card_data['id'], card_from_deck.info.id)
            self.assertEquals(card_data['level'], card_from_deck.level.level)

    def test_update(self):
        """
        **Scenario:**

        - We try to update deck with new card, deck owner is owner of this card.

        ---

        **Expected result:**

        - Response has status 200, deck is updated properly.
        """

        # Create data to update deck with new card
        new_card1 = create_card_with_effect()
        self.user_profile.user_cards.create(card=new_card1)
        data = {
            "card1": {
                "id": new_card1.info.id, "level": new_card1.level.level
            },
            "card2": {
                "id": self.deck.card2.card.info.id, "level": self.deck.card2.card.level.level
            },
            "card3": {
                "id": self.deck.card3.card.info.id, "level": self.deck.card3.card.level.level
            },
            "card4": {
                "id": self.deck.card4.card.info.id, "level": self.deck.card4.card.level.level
            },
            "card5": {
                "id": self.deck.card5.card.info.id, "level": self.deck.card5.card.level.level
            }
        }

        # Make request
        response = self.client.put(self.url, data=data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

        # Assert deck is updated
        self.deck.refresh_from_db()
        self.assertEqual(new_card1.info, self.deck.card1.card.info)
        self.assertEqual(new_card1.level, self.deck.card1.card.level)

    def test_update_not_deck_owner(self):
        not_deck_owner = UserProfileFactory()

        # Create data to update deck with new card
        new_card1 = create_card_with_effect()
        not_deck_owner.user_cards.create(card=new_card1)
        data = {
            "card1": {
                "id": new_card1.info.id, "level": new_card1.level.level
            },
            "card2": {
                "id": self.deck.card2.card.info.id, "level": self.deck.card2.card.level.level
            },
            "card3": {
                "id": self.deck.card3.card.info.id, "level": self.deck.card3.card.level.level
            },
            "card4": {
                "id": self.deck.card4.card.info.id, "level": self.deck.card4.card.level.level
            },
            "card5": {
                "id": self.deck.card5.card.info.id, "level": self.deck.card5.card.level.level
            }
        }

        self.client.force_authenticate(user=not_deck_owner.user)
        response = self.client.put(self.url, data=data, format='json')
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_deck_with_card_which_does_not_exist(self):
        # Create data to update deck with card that does not exist
        data = {
            "card1": {
                "id": 999, "level": 999
            },
            "card2": {
                "id": self.deck.card2.card.info.id, "level": self.deck.card2.card.level.level
            },
            "card3": {
                "id": self.deck.card3.card.info.id, "level": self.deck.card3.card.level.level
            },
            "card4": {
                "id": self.deck.card4.card.info.id, "level": self.deck.card4.card.level.level
            },
            "card5": {
                "id": self.deck.card5.card.info.id, "level": self.deck.card5.card.level.level
            }
        }

        # Make request
        response = self.client.put(self.url, data=data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_not_card_owner(self):
        # TODO: implement this test when there is some way to gain cards implemented.
        #  Right now user should own all cards.
        self.skipTest('Right now user should own all cards.')


class UserCreationAndExperienceTestCase(TestCase):
    def test_should_exp_get_created_on_user_creation(self):
        user = get_user_model().objects.create_user(username='expTest', password='12345')
        on_user_create(None, user)
        profile = UserProfile.objects.get(user=user)
        created_exp = UserStats.objects.get(profile=profile)
        self.assertEqual(created_exp.exp, 0)

    def test_should_exp_get_created_on_user_creation2(self):
        user = get_user_model().objects.create_user(username='expTest2', password='12345')
        on_user_create(None, user)
        profile = UserProfile.objects.get(user=user)
        created_exp = UserStats.objects.get(profile=profile)
        created_exp.exp = 4124
        created_exp.save()

        serializer = UserProfileSerializer(instance=profile)
        self.assertGreater(serializer.data.get('level', None), 1)


class UserProfileSerializerTestCase(TestCase):
    def test_should_serialize_to_level_1_when_exp_is_null(self):
        user = get_user_model().objects.create_user(username='expTest3', password='12345')
        profile = UserProfile.objects.create(user=user)

        serializer = UserProfileSerializer(instance=profile)
        self.assertEqual(serializer.data.get('level', None), 1)

    def test_should_serialize_full_level_data(self):
        experience = Experience(5)
        expected_exp = experience.exp
        expected_level = experience.level
        expected_percentage = experience.next_level_percent
        serializer = UserStatsSerializer(instance=experience)
        self.assertEqual(serializer.data.get('exp'), expected_exp)
        self.assertEqual(serializer.data.get('level'), expected_level)
        self.assertEqual(serializer.data.get('percentage'), expected_percentage)


class UserCardsViewTestCase(TestCase):
    def setUp(self) -> None:
        # Create user
        self.user_profile, _ = create_user_profile_with_deck()
        # Create one more card with more than one level
        effects_data_common = [
            EffectData(CardEffect.EffectId.DOUBLEACTION, 0, 0, CardLevelEffects.Target.PLAYER),
            EffectData(CardEffect.EffectId.DMG, 50, 30, CardLevelEffects.Target.OPPONENT),
            EffectData(CardEffect.EffectId.HEAL, 50, 30, CardLevelEffects.Target.PLAYER),
        ]
        create_card_with_effects(effects_data_common)

        effects_data_epic = \
            effects_data_common + [EffectData(CardEffect.EffectId.TRUE_DMG, 20, 10, CardLevelEffects.Target.OPPONENT)]

        card_for_user = create_card_with_effects(effects_data_epic, CardLevel.Level.EPIC)
        # Give this card to user
        self.user_profile.user_cards.create(card=card_for_user)

        self.client = APIClient()

    def _get_url(self, user_profile):
        return f'/api/user-profiles/{user_profile.user.id}/cards/'

    def test_get_success(self):
        """
        **Scenario:**

        - User is authenticated, has some cards.

        - GET request is performed by this user.

        ---

        **Expected result:**

        - Response is 200 OK, returned data contains all user's cards.
        """

        self.client.force_authenticate(self.user_profile.user)

        response = self.client.get(self._get_url(self.user_profile))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), self.user_profile.user_cards.count())

        # Assert cards data in response is correct
        user_cards_to_compare = [user_card.card for user_card in self.user_profile.user_cards.all()]

        for card_data in response.data:
            card_to_compare = list(filter(lambda c: c.info.id == card_data['id'], user_cards_to_compare))[0]
            user_cards_to_compare.remove(card_to_compare)
            self.assertEqual(card_data['id'], card_to_compare.info.id)
            self.assertEqual(card_data['level'], card_to_compare.level.level)

        self.assertEqual(len(user_cards_to_compare), 0)

    def test_get_not_authenticated(self):
        response = self.client.get(self._get_url(self.user_profile))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_another_user_cards(self):
        """
        **Scenario:**

        - Authenticated user tries to retrieve other user's cards.

        ---

        **Expected result:**

        - Response has status 403 FORBIDDEN.
        """

        # Authenticate
        self.client.force_authenticate(self.user_profile.user)

        # Create another user with cards
        other_user_profile, _ = create_user_profile_with_deck()

        # Try to get other user's cards
        response = self.client.get(self._get_url(other_user_profile))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class UpgradeCardViewTestCase(TestCase):
    def setUp(self) -> None:
        # Create card with all possible levels
        card_info = CardInfoFactory()
        self.card_levels: list[Card] = [
            CardFactory(info=card_info, level=level) for level in CardLevel.objects.order_by('level')
        ]

        # Last level shouldn't have next level cost
        self.card_levels[-1].next_level_cost = None
        self.card_levels[-1].save()

        # Create user profile with enough skill points to upgrade to maximum level
        self.user_profile = UserProfileFactory()
        user_stats = self.user_profile.user_stats
        for card_level in self.card_levels[:len(self.card_levels) - 1]:
            user_stats.skill_points += card_level.next_level_cost
        user_stats.save()

        # Give card with lowest level to user
        user_card = self.user_profile.user_cards.create(card=self.card_levels[0])

        self.client = APIClient()
        self.client.force_authenticate(user=self.user_profile.user)

    @staticmethod
    def _get_url(user_profile: UserProfile, card_info_id: int):
        return f"/api/user-profiles/{user_profile.user.id}/cards/{card_info_id}/upgrade/"

    def test_post_successful(self):
        """
        **Scenario:**

        - User is authenticated, has some card on the lowest level.

        - Card that he owns has more levels, user has enough points to upgrade card to maximum level.

        - User makes requests to upgrade card to maximum level.

        ---

        **Expected result:**

        - Each time request is made response has status 200 OK, proper user card is in response's data.

        - Each time request is made User owns proper card.

        - Each time request is made user has proper amount of skill points subtracted and he owns only upgraded card (user can't own multiple levels of given card)
        """

        user_card = self.user_profile.user_cards.first()
        card_info = user_card.card.info
        user_stats = self.user_profile.user_stats

        # Upgrade card to maximum level and assert everything goes as expected
        for expected_next_level in self.card_levels[1:]:
            previous_level = user_card.card
            expected_skill_points_after_upgrade = user_stats.skill_points - previous_level.next_level_cost

            # Make POST request to update card
            response = self.client.post(self._get_url(self.user_profile, card_info.id), data={}, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            # Assert response contains proper upgraded card data
            self.assertEqual(response.data['id'], card_info.id)
            self.assertEqual(response.data['level'], expected_next_level.level.level)

            # Retrieve currently owned card from db
            user_card = self.user_profile.user_cards.get(
                card__info__id=response.data['id'],
                card__level__level=response.data['level']
            )
            actual_next_level = user_card.card

            # Assert user is owner of correct card
            self.assertEqual(actual_next_level.id, expected_next_level.id)
            # Assert user is no longer owner of the previous level
            self.assertFalse(self.user_profile.user_cards.filter(card__level=previous_level.level.level).exists())

            # Assert user's skill points were subtracted properly
            user_stats.refresh_from_db()
            self.assertEqual(user_stats.skill_points, expected_skill_points_after_upgrade)


class SignalsTestCase(TestCase):
    def test_user_should_gain_exp(self):
        users_stats = UserProfileFactory().user_stats

        exp_gain = 5
        expected_exp = users_stats.exp + exp_gain

        user_should_gain_exp(users_stats, exp_gain)

        users_stats.refresh_from_db()
        self.assertEqual(users_stats.exp, expected_exp)

    def test_user_gained_exp(self):
        """
        **Scenario:**

        - User leveled up from level 1 to 3.

        - user_gained_exp is called

        ---

        **Expected result:**

        - User has proper amount of skill points in database.
        """

        user_stats: UserStats = UserProfileFactory().user_stats

        level_before = 1
        level_after = 3

        expected_skill_points = user_stats.skill_points + calculate_skill_points_gain(level_before, level_after)

        user_gained_exp(user_stats, level_before, level_after)
        user_stats.refresh_from_db()
        self.assertEqual(user_stats.skill_points, expected_skill_points)


# TODO: When gaining cards is implemented remove function _give_all_not_owned_cards_to_user and this test.
class GiveAllCardsTestCase(TestCase):
    def test_give_all_not_owned_cards_to_user(self):
        """
        **Scenario:**

        - There is user with not all cards. In database there are cards objects with many levels.

        - _give_all_not_owned_cards_to_user function is called.

        ---

        **Expected result:**

        - User is given only cards with minimal levels that he didn't own before.
        """

        # Create CardInfo object with 3 levels which user is not owner of
        card_info = CardInfoFactory()
        expected_common_card_to_give = CardFactory(info=card_info, level=CardLevel.objects.get(pk=1))
        card_rare = CardFactory(info=card_info, level=CardLevel.objects.get(pk=2))
        card_epic = CardFactory(info=card_info, level=CardLevel.objects.get(pk=3))

        # Create card which user will own
        owned_card_info = CardInfoFactory()
        not_owned_common = CardFactory(info=owned_card_info, level=CardLevel.objects.get(pk=1))
        owned_epic = CardFactory(info=owned_card_info, level=CardLevel.objects.get(pk=3))

        # Create user, give him one card and call function
        user_profile = UserProfileFactory()
        user_profile.user_cards.create(card=owned_epic)
        given_cards_count = _give_all_not_owned_cards_to_user(user_profile)

        self.assertEqual(given_cards_count, 1)
        self.assertEqual(user_profile.user_cards.count(), 2)

        # Assert user was given correct card with lowest level
        actual_given_common_card = user_profile.user_cards.get(card__level=1).card
        self.assertEqual(actual_given_common_card.id, expected_common_card_to_give.id)
