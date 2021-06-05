from rest_framework import status
from .models import User
from .serializers import RegisterSerializer, BasicUserInfoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


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
