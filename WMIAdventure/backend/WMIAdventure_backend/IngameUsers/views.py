from rest_framework.viewsets import ModelViewSet

from . import serializers
from . import models


# Create your views here.


class UserProfileViewSet(ModelViewSet):
    """
    BasicUserInfo class view.
    """
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()




