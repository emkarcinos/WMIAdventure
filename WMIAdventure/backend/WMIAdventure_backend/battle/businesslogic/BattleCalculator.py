from random import uniform


class BattleCalculator:
    instance = None

    @staticmethod
    def get_instance():
        if BattleCalculator.instance is None:
            BattleCalculator.instance = BattleCalculator()
        return BattleCalculator.instance

    def calculate_effect_power(self, power, power_range, buffs):
        """
        Calculates effect's power.
        @param power: Effect's base power.
        @param power_range:
        @param buffs: Effect's buffs
        @return: Calculated power.
        """

        return power + uniform(-1, 1) * power_range

    def deal_dmg_to(self, player_to, dmg):
        """
        Deals dmg to player
        @param player_to:
        @param dmg:
        @return:
        """

        player_to.statistics.deal_damage(dmg)
