from rest_framework import serializers

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


class OutcomePlayerSerializer(serializers.Serializer):
    """
    Serializes player's data - to be used when serializing battle Outcome.
    """

    id = serializers.IntegerField(help_text="Player's id.")
    statistics = StatisticsSerializer(help_text="Player's statistics.")

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


class SimplifiedCardSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="card_info_id")
    level = serializers.IntegerField()


class SimplifiedDeckSerializer(serializers.Serializer):
    cards = SimplifiedCardSerializer(many=True)


class InitialStatePlayerSerializer(serializers.Serializer):
    player_id = serializers.IntegerField()
    deck = SimplifiedDeckSerializer()


class InitialStateSerializer(serializers.Serializer):
    attacker = InitialStatePlayerSerializer()
    defender = InitialStatePlayerSerializer()


class BattleSerializer(serializers.Serializer):
    """
    Serializes Battle.
    """

    initial_state = InitialStateSerializer(source="recorder.initial_state")

    outcome = OutcomeSerializer()

    def create(self, validated_data):
        return super(BattleSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(BattleSerializer, self).update(instance, validated_data)
