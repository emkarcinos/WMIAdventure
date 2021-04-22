from abc import ABC

from rest_framework import serializers

from . import models


class BasicUserInfoSerializer(serializers.ModelSerializer):
    """
    Serializes BasicUserInfo class.
    """

    class Meta:
        model = models.BasicUserInfo
        fields = ('userId', 'username', 'semester')

    def create(self, validated_data):
        buinfo = models.BasicUserInfo(
            userId=validated_data['userId'],
            username=validated_data['username'],
            semester=validated_data['semester']
        )

        buinfo.save()
        return buinfo
