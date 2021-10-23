from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from WMIAdventure_backend.settings import SESSION_COOKIE_AGE, SESSION_COOKIE_NAME
from .models import User
from .serializers import RegisterSerializer, BasicUserInfoSerializer, BasicUserSerializer


# Create your views here.
from .signals import user_registered


class UserRegister(APIView):

    def post(self, request):
        """
        Register user.
        """

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_registered.send(sender=self.__class__, user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):

    def get(self, request):
        """
        List users.
        """

        serializer = BasicUserInfoSerializer(User.objects.all(), many=True)
        return Response(serializer.data)


class AuthTokenView(APIView):
    """
    Provides way of accessing authorization tokens just by providing username in the request.

    This view exists only for testing purposes.
    """

    def post(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        response = Response(data={'token': token.key})
        response.set_cookie(SESSION_COOKIE_NAME, token.key, expires=SESSION_COOKIE_AGE)
        return response


class WhoAmIView(APIView):
    """
    Provides info about currently logged in user
    """
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        try:
            user = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BasicUserSerializer(user)
        return Response(serializer.data)
