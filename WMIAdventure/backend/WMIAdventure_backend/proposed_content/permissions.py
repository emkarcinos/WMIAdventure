from rest_framework import permissions

from proposed_content.models import ProposedCardInfo


class CanEdit(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: ProposedCardInfo):
        return obj.owner == request.user