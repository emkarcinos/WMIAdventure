from ratelimit.core import get_usage
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from WMIAdventure_backend.settings import SESSION_COOKIE_AGE, SESSION_COOKIE_NAME, HTTPS_ENABLED
from utils.errors import registration_ratelimit_error
from .models import User
from .serializers import RegisterSerializer, BasicUserInfoSerializer, BasicUserSerializer, LoginSerializer
# Create your views here.
from .signals import user_registered


class UserRegister(APIView):
    def post(self, request):
        """
        Register user.
        """
        limiting = get_usage(request, fn=UserRegister, key='ip', rate='1/d', increment=False)
        if limiting is not None and limiting.get('should_limit', False):
            return Response(registration_ratelimit_error, status=status.HTTP_400_BAD_REQUEST)

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_registered.send(sender=self.__class__, user=user)
            get_usage(request, fn=UserRegister, key='ip', rate='1/d', increment=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):

    def get(self, request):
        """
        List users.
        """

        serializer = BasicUserInfoSerializer(User.objects.all(), many=True)
        return Response(serializer.data)


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


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
        response = Response(data=serializer.data)
        response.set_cookie(
            SESSION_COOKIE_NAME,
            serializer.data.get('token'),
            expires=SESSION_COOKIE_AGE,
            secure=HTTPS_ENABLED
        )
        return response
