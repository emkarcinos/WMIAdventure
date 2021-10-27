from rest_framework import permissions

from IngameUsers.models import UserDeck, UserProfile


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, profile: UserProfile):
        return profile.user == request.user