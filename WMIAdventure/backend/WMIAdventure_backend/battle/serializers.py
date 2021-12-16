from rest_framework import serializers

from IngameUsers.models import UserProfile
from IngameUsers.serializers import UserDecksSerializer
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
        try:
            player_profile = UserProfile.objects.get(user_id=value)
            # We only use one deck for now, so we will just return the first one here.
            # Appropriate deck should be returned based on whether this player was the attacker or the defender,
            # but I couldn't do it easily so I just left it like this.
            # TODO: Change this after adding multiple deck support
            return UserDecksSerializer(player_profile).data.get('user_decks', None)[0]
        except (UserProfile.DoesNotExist, IndexError):
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
    exp_gain = serializers.IntegerField(source='attacker_exp_gain')

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


# Card Serializers


class BattleStartCardSerializer(serializers.Serializer):
    """
    Used when serializing full info about player's deck. (card's id and level)
    """

    id = serializers.IntegerField(source="card_info_id")
    level = serializers.IntegerField()


# Player Serializers

class BaseSimplifiedPlayerSerializer(serializers.Serializer):
    """
    Base for all SimplifiedPlayer serializers.
    """

    stats = StatisticsSerializer()


class BattleStartPlayerSerializer(BaseSimplifiedPlayerSerializer):
    """
    Used when serializing full info about player before battle start. (details like player's id and full info about deck)
    """

    id = serializers.IntegerField()
    deck = BattleStartCardSerializer(source="deck.cards", many=True)


class TurnPlayerSerializer(BaseSimplifiedPlayerSerializer):
    """
    Used when serializing only part of player's data and also some of his state during concrete turn.
    """

    deck = serializers.ListField(serializers.IntegerField())
    """Deck of only cards ids"""

    turns_stopped = serializers.IntegerField(required=False)


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
    buffed_card = serializers.IntegerField(source="buffed_card.card_model.info.id", required=False)

    # Not all effects are changing order of deck
    new_deck_order = serializers.ListField(serializers.IntegerField(), required=False, source="reordered_deck")
    """List of cards ids"""

    # Not all effects stop player
    turns_stopped = serializers.IntegerField(required=False)

    # Not all effects block other cards
    turns_blocked = serializers.IntegerField(required=False)
    blocked_card = serializers.IntegerField(source="blocked_card.card_model.info.id", required=False)


class TurnSerializer(serializers.Serializer):
    attacker = TurnPlayerSerializer()
    defender = TurnPlayerSerializer()
    card_executor = serializers.IntegerField(source="card_executor_id")
    used_card = serializers.IntegerField(source="used_card.card_info_id", allow_null=True)
    used_effects = UsedEffectSerializer(many=True)


class BattleSerializer(serializers.Serializer):
    """
    Serializes Battle.
    """

    attacker = BattleStartPlayerSerializer(source="recorder.attacker")
    defender = BattleStartPlayerSerializer(source="recorder.defender")

    turns = TurnSerializer(source="recorder.turns", many=True)

    outcome = OutcomeSerializer()

    def create(self, validated_data):
        return super(BattleSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        return super(BattleSerializer, self).update(instance, validated_data)
