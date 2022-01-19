from django.db.models import F
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers
from .businesslogic.exceptions import CannotUpgradeCardException
from .businesslogic.experience.Experience import Experience
from .businesslogic.upgrading_cards import upgrade_card
from .models import UserProfile, UserCard, UserDeck
from .permissions import CanEditProfile, IsDeckOwner, IsCardsOwner, IsDecksOwner
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
    queryset = models.UserProfile.objects.select_related('user_stats').all()
    pagination_class = UserPagination


class UserView(generics.RetrieveUpdateDestroyAPIView):
    """
    Fetches a user.
    """

    permission_classes = [CanEditProfile]

    queryset = models.UserProfile.objects.select_related('user_stats').all()

    def get_serializer_class(self):
        if self.request and self.request.user.id == self.kwargs['pk']:
            return serializers.MyUserProfileSerializer
        return serializers.UserProfileSerializer


class UserDecksView(RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsDecksOwner]

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

    def get_object(self):
        decks = self.get_queryset()
        self.check_object_permissions(self.request, decks)

        return decks

    def get_queryset(self):
        return UserDeck.objects.filter(user_profile__user_id=self.kwargs['pk']).select_related(
            'deck',
            'user_profile__user',
            'deck__card2__card__info',
            'deck__card3__card__info',
            'deck__card4__card__info',
            'deck__card5__card__info',
            'deck__card1__card__level',
            'deck__card2__card__level',
            'deck__card3__card__level',
            'deck__card4__card__level',
            'deck__card5__card__level',
        )


class UserDeckView(RetrieveUpdateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsDeckOwner]

    serializer_class = DeckSerializer

    def get_object(self):
        deck = get_object_or_404(self.get_queryset()).deck
        self.check_object_permissions(self.request, deck)
        return deck

    def get_queryset(self):
        return UserDeck.objects.filter(user_profile__user_id=self.kwargs['pk']).select_related(
            'deck',
            'user_profile__user',
            'deck__card2__card__info',
            'deck__card3__card__info',
            'deck__card4__card__info',
            'deck__card5__card__info',
            'deck__card1__card__level',
            'deck__card2__card__level',
            'deck__card3__card__level',
            'deck__card4__card__level',
            'deck__card5__card__level',
        ).filter(deck_number=self.kwargs['deck_number'])

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


class UserCardsView(generics.ListAPIView):
    serializer_class = UserCardSerializer
    permission_classes = [IsAuthenticated, IsCardsOwner]

    def get_queryset(self):
        user_id = self.kwargs['pk']
        user_profile = get_object_or_404(UserProfile.objects.all(), pk=user_id)
        return user_profile.user_cards.all()


class UpgradeCardView(APIView):
    permission_classes = [IsAuthenticated, IsCardsOwner]

    def post(self, request, pk, card_id):
        user_profile: UserProfile = get_object_or_404(UserProfile.objects.all(), pk=pk)

        try:
            user_card: UserCard = user_profile.user_cards.annotate(info=F('card__info')).get(info=card_id)
        except UserCard.DoesNotExist:
            return Response(
                data={'details': f'User is not owner of card with id {card_id} or it does not exist.'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            upgraded_user_card = upgrade_card(user_card)
        except CannotUpgradeCardException as e:
            return Response(data={'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            data=UserCardSerializer(instance=upgraded_user_card).data,
            status=status.HTTP_200_OK
        )
