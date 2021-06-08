from rest_framework import serializers

from cards.models import Card
from . import models
from .models import UserProfile, Deck


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializes BasicUserInfo class.
    """

    class Meta:
        model = models.UserProfile
        fields = ('user', 'displayedUsername', 'semester')

    def create(self, validated_data):
        newProfile = models.UserProfile.objects.create(
            user=validated_data['user'],
            displayedUsername=validated_data['displayedUsername'],
            semester=validated_data['semester']
        )

        newProfile.save()
        return newProfile


class UserCardSerializer(serializers.ModelSerializer):
    """
    Serializes UserCard model.
    Card is acquired from the UserCard model and serialized to bare minimum information.
    """

    # ID points to an ID of a CardInfo object
    id = serializers.IntegerField(source='card.info.id')
    level = serializers.IntegerField(source='card.level.level')

    class Meta:
        model = Card
        fields = ['id', 'level']


class DeckSerializer(serializers.ModelSerializer):
    """
    Serializes a deck.
    We store each card separately with an index, because the order of them does matter.
    deck_number is also stored as we need to know whether this is an attacking or defending deck.
    """
    card1 = UserCardSerializer(source='deck.card1')
    card2 = UserCardSerializer(source='deck.card2')
    card3 = UserCardSerializer(source='deck.card3')
    card4 = UserCardSerializer(source='deck.card4')
    card5 = UserCardSerializer(source='deck.card5')
    deck_number = serializers.IntegerField()

    class Meta:
        model = Deck
        fields = ['deck_number', 'card1', 'card2', 'card3', 'card4', 'card5']


class UserDecksSerializer(serializers.ModelSerializer):
    """
    Serializes decks of a given user.
    """
    user_decks = DeckSerializer(many=True, source='user_decks.all')

    class Meta:
        model = UserProfile
        fields = ['user_decks']
