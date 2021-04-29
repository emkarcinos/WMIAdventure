from django.test import TestCase
from rest_framework.test import APIRequestFactory
from . import models
from . import views
from django.conf import settings

# Create your tests here.


# run these tests after user model creation

# class UserProfileTestCase(TestCase):
#     testObjectId = settings.AUTH_USER_MODEL.objects.create_user(username='testusername', password='12345')
#     testUsername = "test"
#     testSemesterId = 1
#
#     def setUp(self) -> None:
#         models.UserProfile.objects.create(user=self.testObjectId,
#                                           displayedUsername=self.testUsername,
#                                           semester=models.Semester(self.testSemesterId))
#
#     def testDBCreation(self):
#         user = models.UserProfile.objects.get(user=self.testObjectId)
#         self.assertEqual(self.testUsername, user.displayedUsername)
#         self.assertEqual(self.testSemesterId, user.semester.semesterNumber)
#
#     def testApiGet(self):
#         factory = APIRequestFactory()
#         view = views.UserProfileViewSet.as_view({"get": "list"})
#         testRequest = factory.get('/api/igusers/basic')
#         response = view(testRequest)
#         self.assertEqual(self.testObjectId, response.data[0]['user'])
#         self.assertEqual(self.testUsername, response.data[0]['displayedUsername'])
#         self.assertEqual(self.testSemesterId, response.data[0]['semester'])
#
#     def testApiPost(self):
#         factory = APIRequestFactory()
#         view = views.UserProfileViewSet.as_view({"get": "list", "post": "create"})
#         newId = 2
#         newUsername = "test2"
#         newSemester = 5
#         result = factory.post('/api/igusers/basic', data={'user': newId,
#                                                           'displayedUsername': newUsername,
#                                                           'semester': newSemester}, format='json')
#         view(result)
#         testRequest = factory.get('/api/igusers/basic')
#         response = view(testRequest)
#         self.assertEqual(newId, response.data[1]['user'])
#         self.assertEqual(newUsername, response.data[1]['displayedUsername'])
#         self.assertEqual(newSemester, response.data[1]['semester'])
