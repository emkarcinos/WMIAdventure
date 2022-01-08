from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from . import models
from . import serializers
from .businesslogic.experience.Experience import Experience
from .models import UserProfile
from .permissions import IsOwner, CanEditProfile, IsDeckOwner
from .serializers import UserDecksSerializer, DeckSerializer, UserStatsSerializer


class UserPagination(PageNumberPagination):
    page_size = 5000
    page_size_query_param = 'pagesize'
    max_page_size = 5000


class PaginatedUsersView(generics.ListCreateAPIView):
    """
    Lists all users with paging
    """
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    pagination_class = UserPagination


class UserView(generics.RetrieveUpdateDestroyAPIView):
    """
    Fetches a user.
    """

    permission_classes = [CanEditProfile]

    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()


class UserDecksView(RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

    """
    Get decks of a given user.

    Each user has two decks: Deck used to attack other players and another deck to defend themselves from other
    attackers.

    Each deck is simplified to it's number and five cards - each card having its ID and a level.

    Sample JSON output:

        {
        "user_decks": [
            {
                "deck_number": 1,
                "card1": {
                    "id": 4,
                    "level": 1
                },
                "card2": {
                    "id": 2,
                    "level": 1
                },
                "card3": {
                    "id": 3,
                    "level": 1
                },
                "card4": {
                    "id": 1,
                    "level": 1
                },
                "card5": {
                    "id": 5,
                    "level": 1
                }
            }
        ]
        }

    """
    serializer_class = UserDecksSerializer
    queryset = UserProfile.objects.all()


class UserDeckView(RetrieveUpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsDeckOwner]

    serializer_class = DeckSerializer
    lookup_field = 'deck_number'

    def get_object(self):
        deck = get_object_or_404(self.get_queryset(), deck_number=self.kwargs['deck_number']).deck
        self.check_object_permissions(self.request, deck)
        return deck

    def get_queryset(self):
        user = get_object_or_404(User.objects.all(), pk=self.kwargs['pk'])
        user_profile = user.userprofile
        return user_profile.user_decks.all()

    def update(self, request, *args, **kwargs):
        deck_to_update = self.get_object()

        serializer: DeckSerializer = self.get_serializer(instance=deck_to_update, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserLevelView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk: int):
        try:
            profile = UserProfile.objects.get(pk=pk)
            experience_obj = Experience(0)
            if hasattr(profile, 'user_stats'):
                experience_obj = Experience(profile.user_stats.exp)

            serializer = UserStatsSerializer(experience_obj)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
