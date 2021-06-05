from django.db.utils import IntegrityError
from django.test import TestCase
from rest_framework.test import APIRequestFactory

from cards.models import Card, CardInfo, CardLevel
from . import views
from django.contrib.auth import get_user_model

from .models import UserProfile, Semester, UserCard


class UserProfileTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_user = get_user_model().objects.create_user(username='testusername', password='12345')

    def setUp(self) -> None:
        self.test_username = "testuser"
        self.semester = 5
        self.user_profile = UserProfile(user_id=self.test_user.id,
                                        displayedUsername=self.test_username,
                                        semester=Semester(5))
        self.user_profile.save()

    def testApiGet(self):
        factory = APIRequestFactory()
        view = views.UserProfileViewSet.as_view({"get": "list"})
        testRequest = factory.get('/api/igusers/basic')
        response = view(testRequest)
        self.assertEqual(self.test_user.id, response.data[0]['user'])
        self.assertEqual(self.test_username, response.data[0]['displayedUsername'])
        self.assertEqual(self.semester, response.data[0]['semester'])

    def testApiPost(self):
        self.user_profile.delete()
        factory = APIRequestFactory()
        view = views.UserProfileViewSet.as_view({"get": "list", "post": "create"})
        new_user = get_user_model().objects.create_user(username="asdasa", password="129312", email="tse@tst.sd")
        new_username = "test2"
        new_semester = 5
        result = factory.post('/api/igusers/basic', data={'user': new_user.id,
                                                          'displayedUsername': new_username,
                                                          'semester': new_semester}, format='json')
        view(result)
        testRequest = factory.get('/api/igusers/basic')
        response = view(testRequest)
        self.assertEqual(new_user.id, response.data[0]['user'])
        self.assertEqual(new_username, response.data[0]['displayedUsername'])
        self.assertEqual(new_semester, response.data[0]['semester'])

    @classmethod
    def tearDownClass(cls):
        cls.test_user.delete()


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
