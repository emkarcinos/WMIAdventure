from rest_framework.fields import ImageField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from cards.models import Card
from utils.SVGAndImageFormField import SVGAndImageFormField
from . import models
from .businesslogic.experience.Experience import Experience
from .models import UserProfile, Deck, UserCard, UserDeck


class UserStatsSerializer(serializers.Serializer):
    exp = serializers.IntegerField()
    level = serializers.IntegerField()
    percentage = serializers.IntegerField(source='next_level_percent')


class UserLevelSerializer(serializers.Field):
    def to_internal_value(self, data):
        pass

    def get_attribute(self, instance):
        if not hasattr(instance, 'user_stats'):
            return 0
        return super().get_attribute(instance)

    def to_representation(self, instance):
        experience_obj = Experience(instance)
        return experience_obj.level


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializes BasicUserInfo class.
    """
    level = UserLevelSerializer(source='user_stats.exp', required=False)

    class Meta:
        model = models.UserProfile
        fields = ('user', 'displayedUsername', 'semester', 'image', 'level')

    def create(self, validated_data):
        newProfile = models.UserProfile.objects.create(
            user=validated_data['user'],
            displayedUsername=validated_data['displayedUsername'],
            semester=validated_data['semester'],
            image=validated_data.get('image', None)
        )

        newProfile.save()
        return newProfile

    def update(self, instance, validated_data):
        data_without_semester = {
            'user': validated_data['user'],
            'displayedUsername': validated_data['displayedUsername'],
            'image': validated_data.get('image', instance.image)
        }
        print(instance.image)
        return super().update(instance, data_without_semester)


class MyUserProfileSerializer(UserProfileSerializer):
    """
    Serializes UserProfile with fields that should only be seen by profile owner.
    """

    skill_points = serializers.IntegerField(source='user_stats.skill_points', read_only=True)
    image = ImageField(required=False, _DjangoImageField=SVGAndImageFormField)

    class Meta:
        model = models.UserProfile
        fields = ('user', 'displayedUsername', 'semester', 'image', 'level', 'skill_points')


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


class DeckSerializer(serializers.Serializer):
    card1 = UserCardSerializer()
    card2 = UserCardSerializer()
    card3 = UserCardSerializer()
    card4 = UserCardSerializer()
    card5 = UserCardSerializer()

    def _validate_cards_exist(self, deck_data) -> list[Card]:
        """
        Validates that all given cards exist.

        :return: Cards retrieved from database.
        :raises ValidationError: If one of the cards does not exist.
        """

        cards = []
        for deck_card in deck_data.values():
            card_data = deck_card.get('card', None)
            if card_data is None:
                raise ValidationError('Deck data is not valid.')
            try:
                card = Card.objects.get(info=card_data['info']['id'], level=card_data['level']['level'])
                cards.append(card)
            except Card.DoesNotExist:
                raise ValidationError('Provided card does not exist.')

        return cards

    def _validate_user_owns_cards(self, instance: Deck, cards: list[Card]):
        """
        Validates if owner of deck instance owns all provided cards.

        :param instance: Deck instance.
        :param cards: Cards to be checked
        :raises ValidationError: If user doesn't own one of the cards.
        """

        user_profile = instance.userdeck.user_profile
        if user_profile.user_cards.filter(card__in=cards).count() != 5:
            raise ValidationError("User is not owner of all the 5 cards")

    def validate(self, attrs):
        """
        Validate if provided cards exist and if updating some deck instance check that user owns all the cards.
        """

        cards = self._validate_cards_exist(attrs)

        # If updating some deck instance validate if user owns all given cards
        if self.instance:
            self._validate_user_owns_cards(self.instance, cards)

        return attrs

    def update(self, instance, validated_data):
        """
        Updates deck instance with given validated data.

        :param instance:
        :param validated_data:
        :return: Updated deck instance.
        """

        # Retrieve all cards from database with validated data
        cards = [
            Card.objects.get(
                info=validated_data[f'card{i}']['card']['info']['id'],
                level=validated_data[f'card{i}']['card']['level']['level']
            )
            for i in range(1, 6)
        ]

        # Get UserCards and update deck instance
        user_cards = [
            UserCard.objects.get(card=card, user_profile=instance.userdeck.user_profile) for card in cards
        ]

        instance.card1 = user_cards[0]
        instance.card2 = user_cards[1]
        instance.card3 = user_cards[2]
        instance.card4 = user_cards[3]
        instance.card5 = user_cards[4]
        instance.save()

        return instance


class UserDeckSerializer(serializers.ModelSerializer):
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
        model = UserDeck
        fields = ['deck_number', 'card1', 'card2', 'card3', 'card4', 'card5']


class UserDecksSerializer(serializers.ModelSerializer):
    """
    Serializes decks of a given user.
    """
    user_decks = UserDeckSerializer(many=True, source='user_decks.all')

    class Meta:
        model = UserProfile
        fields = ['user_decks']
