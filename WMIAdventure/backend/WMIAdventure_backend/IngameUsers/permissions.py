from rest_framework import permissions
from rest_framework.permissions import IsAdminUser

from IngameUsers.models import UserProfile


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, profile: UserProfile):
        return profile.user == request.user


class CanEditProfile(permissions.BasePermission):

    def has_object_permission(self, request, view, profile: UserProfile):
        if request.method not in permissions.SAFE_METHODS:
            has_ownership = (profile.user == request.user)
            is_staff = IsAdminUser().has_permission(request, view)
            return has_ownership or is_staff
        return True
