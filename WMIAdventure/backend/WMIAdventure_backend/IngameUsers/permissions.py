from rest_framework import permissions
from rest_framework.permissions import IsAdminUser

from IngameUsers.models import UserProfile, Deck


class IsCardsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.id == view.kwargs['pk']


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, profile: UserProfile):
        return profile.user == request.user


class IsDeckOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, deck: Deck):
        return deck.userdeck.user_profile.user == request.user


class IsDecksOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, deck: Deck):
        if len(deck):
            return deck[0].user_profile.user == request.user
        return False


class CanEditProfile(permissions.BasePermission):

    def has_object_permission(self, request, view, profile: UserProfile):
        if request.method not in permissions.SAFE_METHODS:
            has_ownership = (profile.user == request.user)
            is_staff = IsAdminUser().has_permission(request, view)
            return has_ownership or is_staff
        return True
