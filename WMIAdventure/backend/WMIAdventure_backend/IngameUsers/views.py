from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cards.models import Card
from users.models import User
from . import models
from . import serializers
from .models import UserProfile, UserCard
from .permissions import IsOwner, CanEditProfile, IsDeckOwner
from .serializers import UserDecksSerializer, DeckSerializer


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

    def _give_all_not_owned_cards_to_user(self, user_profile, request_data):
        """
        Gives cards to user if he doesn't own them.

        TODO: REMOVE THIS IN THE FUTURE. For now all users should have all cards, this method will be removed when
         there will be some way of gaining cards from battle or there will be some other way.

        :raises django.http.Http404: If some of given cards does not exist.
        """

        cards = [
            get_object_or_404(
                Card.objects.all(),
                info=request_data[f'card{i}']['id'],
                level=request_data[f'card{i}']['level']
            )
            for i in range(1, 6)
        ]
        for card in cards:
            UserCard.objects.get_or_create(
                user_profile=user_profile,
                card=card
            )

    def update(self, request, *args, **kwargs):
        deck_to_update = self.get_object()
        self._give_all_not_owned_cards_to_user(request.user.userprofile,
                                               request.data)  # TODO: Remove this when gaining cards is implemented

        serializer: DeckSerializer = self.get_serializer(instance=deck_to_update, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
