from rest_framework import serializers

from IngameUsers.models import UserDeck, UserProfile
from IngameUsers.serializers import DeckSerializer, UserDecksSerializer
from battle.businesslogic.Statistics import Statistics


class StatisticsSerializer(serializers.Serializer):
    """
    Serializes player's statistics.
    """

    hp = serializers.FloatField(help_text="Health points.")
    armour = serializers.FloatField(help_text="Armour points.")

    def create(self, validated_data):
        stats = Statistics()
        stats.hp = validated_data.get("hp")
        stats.armour = validated_data.get("armour")
        return stats

    def update(self, instance, validated_data):
        pass


class PlayerDeckField(serializers.Field):
    def to_internal_value(self, data):
        pass

    def to_representation(self, value):
        player_profile = UserProfile.objects.get(user_id=value)

        # We only use one deck for now, so we will just return the first one here.
        # Appropriate deck should be returned based on whether this player was the attacker or the defender,
        # but I couldn't do it easily so I just left it like this.
        # TODO: Change this after adding multiple deck support
        try:
            return UserDecksSerializer(player_profile).data.get('user_decks', None)[0]
        except IndexError:
            return None


class OutcomePlayerSerializer(serializers.Serializer):
    """
    Serializes player's data - to be used when serializing battle Outcome.
    """

    id = serializers.IntegerField(help_text="Player's id.")
    statistics = StatisticsSerializer(help_text="Player's statistics.")
    deck = PlayerDeckField(source="id")

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class OutcomeSerializer(serializers.Serializer):
    """
    Serializes battle Outcome.
    """

    winner = serializers.IntegerField(source="get_winner.id", allow_null=True,
                                      help_text="Winner's id - can be None if both of the players were defeated (draw)")
    attacker = OutcomePlayerSerializer(help_text="Attacker - player who started battle.")
    defender = OutcomePlayerSerializer(help_text="Defender.")

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
