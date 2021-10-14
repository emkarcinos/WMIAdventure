from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import RegisterSerializer, BasicUserInfoSerializer


# Create your views here.

class UserRegister(APIView):

    def post(self, request):
        """
        Register user.
        """

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):

    def get(self, request):
        """
        List users.
        """

        serializer = BasicUserInfoSerializer(User.objects.all(), many=True)
        return Response(serializer.data)


class NoAuthorizationAuthToken(APIView):
    """
    Provides way of accessing authorization tokens just by providing username in the request.

    This view exists only for testing purposes.
    """

    def post(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
