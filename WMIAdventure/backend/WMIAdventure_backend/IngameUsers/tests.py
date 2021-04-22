from django.test import TestCase
from rest_framework.test import APIRequestFactory
from . import models
from . import views


# Create your tests here.


class BasicUserInfoTestCase(TestCase):
    testObjectId = 1
    testUsername = "test"
    testSemesterId = 1

    def setUp(self) -> None:
        models.BasicUserInfo.objects.create(userId=self.testObjectId,
                                            username=self.testUsername,
                                            semester=models.Semester(self.testSemesterId))

    def testDBCreation(self):
        user = models.BasicUserInfo.objects.get(userId=self.testObjectId)
        self.assertEqual(self.testUsername, user.username)
        self.assertEqual(self.testSemesterId, user.semester.semesterNumber)

    def testApiGet(self):
        factory = APIRequestFactory()
        view = views.BasicUserInfoViewSet.as_view({"get": "list"})
        testRequest = factory.get('/api/igusers/basic')
        response = view(testRequest)
        self.assertEqual(self.testObjectId, response.data[0]['userId'])
        self.assertEqual(self.testUsername, response.data[0]['username'])
        self.assertEqual(self.testSemesterId, response.data[0]['semester'])

    def testApiPost(self):
        factory = APIRequestFactory()
        view = views.BasicUserInfoViewSet.as_view({"get": "list", "post": "create"})
        newId = 2
        newUsername = "test2"
        newSemester = 5
        result = factory.post('/api/igusers/basic', data={'userId': newId,
                                                 'username': newUsername,
                                                 'semester': newSemester}, format='json')
        view(result)
        testRequest = factory.get('/api/igusers/basic')
        response = view(testRequest)
        self.assertEqual(newId, response.data[1]['userId'])
        self.assertEqual(newUsername, response.data[1]['username'])
        self.assertEqual(newSemester, response.data[1]['semester'])
