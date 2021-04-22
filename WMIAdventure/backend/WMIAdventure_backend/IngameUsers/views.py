from rest_framework.viewsets import ModelViewSet

from . import serializers
from . import models


# Create your views here.


class BasicUserInfoViewSet(ModelViewSet):
    """
    BasicUserInfo class view.
    """
    serializer_class = serializers.BasicUserInfoSerializer
    queryset = models.BasicUserInfo.objects.all()




