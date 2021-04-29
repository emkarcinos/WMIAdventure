from abc import ABC

from rest_framework import serializers

from . import models


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializes BasicUserInfo class.
    """

    class Meta:
        model = models.UserProfile
        fields = ('user', 'displayedUsername', 'semester')

    def create(self, validated_data):
        newProfile = models.UserProfile(
            userId=validated_data['userId'],
            displayedUsername=validated_data['displayedUsername'],
            semester=validated_data['semester']
        )

        newProfile.save()
        return newProfile
