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


class BuffSerializer(serializers.Serializer):
    """
    Serializes information of given Buff instance.
    """

    buff_type = serializers.IntegerField(
        help_text="Id of effect to which this buff applies. Can be null if buff applies to all kinds of effects."
    )

    modifier = serializers.FloatField(required=False)

    # multiplier is not being used now, maybe we will use it in the future
    # multiplier = serializers.FloatField(required=False)


class SimplifiedCardSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="card_info_id")
    level = serializers.IntegerField()

    # Card do not always has buffs
    buffs = BuffSerializer(many=True, required=False)


class SimplifiedDeckSerializer(serializers.Serializer):
    cards = SimplifiedCardSerializer(many=True)


class SimplifiedPlayerSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="player_id")
    stats = StatisticsSerializer()
    deck = SimplifiedDeckSerializer()


class BuffedCardSerializer(serializers.Serializer):
    """
    Serializes information which tells us which card was buffed.
    """

    id = serializers.IntegerField(source="card_model.info.id", help_text="Buffed card's id.")
    level = serializers.IntegerField(source="card_model.level.level", help_text="Buffed card's level.")


class UsedEffectSerializer(serializers.Serializer):
    """
    Serializes information of used effect, who was target and what changes this effect caused.
    """

    id = serializers.IntegerField()
    target_player = serializers.IntegerField()

    # Not all effects have power
    power = serializers.FloatField(required=False)

    # Not all effects change stats
    changed_stats = StatisticsSerializer(required=False)

    # Not all effects are buffing other cards
    buff = BuffSerializer(required=False)
    buffed_card = BuffedCardSerializer(required=False)


class TurnSerializer(serializers.Serializer):
    attacker = SimplifiedPlayerSerializer()
    defender = SimplifiedPlayerSerializer()
    card_executor = serializers.IntegerField(source="card_executor_id")
    used_card = SimplifiedCardSerializer()
    used_effects = UsedEffectSerializer(many=True)


class BattleSerializer(serializers.Serializer):
    """
    Serializes Battle.
    """

    turns = TurnSerializer(source="recorder.turns", many=True)

    outcome = OutcomeSerializer()

    def create(self, validated_data):
        return super(BattleSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(BattleSerializer, self).update(instance, validated_data)
