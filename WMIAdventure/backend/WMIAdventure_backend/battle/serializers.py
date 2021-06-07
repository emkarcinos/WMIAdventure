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
