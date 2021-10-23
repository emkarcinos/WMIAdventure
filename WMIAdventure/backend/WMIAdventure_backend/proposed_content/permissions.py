from rest_framework import permissions
from rest_framework.permissions import IsAdminUser

from proposed_content.models import ProposedCardInfo


class CanEdit(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: ProposedCardInfo):
        has_ownership = (obj.owner == request.user)
        is_staff = IsAdminUser().has_permission(request, view)
        return has_ownership or is_staff
