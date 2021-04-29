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
        newProfile = models.UserProfile.objects.create(
            user=validated_data['user'],
            displayedUsername=validated_data['displayedUsername'],
            semester=validated_data['semester']
        )

        newProfile.save()
        return newProfile
