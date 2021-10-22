from rest_framework import permissions
from rest_framework.permissions import IsAdminUser


class IsAbleToEdit(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method not in permissions.SAFE_METHODS:
            adminPermissions = IsAdminUser()
            return adminPermissions.has_permission(request=request, view=view)
        return True
