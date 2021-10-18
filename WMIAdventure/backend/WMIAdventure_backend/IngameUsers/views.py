from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.pagination import PageNumberPagination

from . import serializers
from . import models
from .models import UserProfile
from .serializers import UserDecksSerializer


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
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()


class UserDeckView(RetrieveAPIView):
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





