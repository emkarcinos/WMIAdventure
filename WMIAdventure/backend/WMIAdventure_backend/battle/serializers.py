from rest_framework import serializers

from battle.businesslogic.Statistics import Statistics


class StatisticsSerializer(serializers.Serializer):
    hp = serializers.FloatField()
    armour = serializers.FloatField()

    def create(self, validated_data):
        stats = Statistics()
        stats.hp = validated_data.get("hp")
        stats.armour = validated_data.get("armour")
        return stats

    def update(self, instance, validated_data):
        pass


class OutcomePlayerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    statistics = StatisticsSerializer()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class OutcomeSerializer(serializers.Serializer):
    winner = serializers.IntegerField(source="get_winner.id", allow_null=True)
    attacker = OutcomePlayerSerializer()
    defender = OutcomePlayerSerializer()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
