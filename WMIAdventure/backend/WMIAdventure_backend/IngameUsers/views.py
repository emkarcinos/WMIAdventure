from django.db.models import Q
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cards.models import Card
from users.models import User
from . import models
from . import serializers
from .businesslogic.experience.Experience import Experience
from .models import UserProfile, UserCard
from .permissions import IsOwner, CanEditProfile, IsDeckOwner, IsCardsOwner
from .serializers import UserDecksSerializer, DeckSerializer, UserStatsSerializer, UserCardSerializer


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

    queryset = models.UserProfile.objects.all()

    def get_serializer_class(self):
        if self.request.user.id == self.kwargs['pk']:
            return serializers.MyUserProfileSerializer
        return serializers.UserProfileSerializer


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
        Gives all cards to user if he doesn't own them.

        TODO: REMOVE THIS IN THE FUTURE. For now all users should have all cards, this method will be removed when
         there will be some way of gaining cards from battle or there will be some other way.
        """

        # If user is not owner of all cards then give him all cards
        if user_profile.user_cards.all().count() != Card.objects.all().count():
            user_cards_ids = user_profile.user_cards.values_list('card_id', flat=True)
            not_owned_cards = Card.objects.filter(~Q(pk__in=user_cards_ids))
            new_user_cards = [UserCard(user_profile=user_profile, card=card) for card in not_owned_cards]
            UserCard.objects.bulk_create(new_user_cards)

    def update(self, request, *args, **kwargs):
        deck_to_update = self.get_object()
        self._give_all_not_owned_cards_to_user(request.user.userprofile,
                                               request.data)  # TODO: Remove this when gaining cards is implemented

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


class UserCardsView(generics.ListAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated, IsCardsOwner]

    def get_queryset(self):
        user_id = self.kwargs['pk']
        user_profile = get_object_or_404(UserProfile.objects.all(), pk=user_id)
        return user_profile.user_cards.all()
