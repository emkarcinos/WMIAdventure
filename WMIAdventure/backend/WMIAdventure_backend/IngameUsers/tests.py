from django.test import TestCase
from rest_framework.test import APIRequestFactory
from . import views
from django.contrib.auth import get_user_model

from .models import UserProfile, Semester


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
        self.user_profile .save()

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
