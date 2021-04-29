from rest_framework.viewsets import ModelViewSet

from . import serializers
from . import models


# Create your views here.


class UserProfileViewSet(ModelViewSet):
    """
    UserProfile class view.
    """
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()




