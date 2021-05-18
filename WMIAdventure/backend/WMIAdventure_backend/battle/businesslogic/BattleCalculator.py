from random import uniform
from typing import List

from .CardBuff import CardBuff


class BattleCalculator:
    instance = None

    @staticmethod
    def get_instance():
        if BattleCalculator.instance is None:
            BattleCalculator.instance = BattleCalculator()
        return BattleCalculator.instance

    def calculate_effect_power(self, power, power_range, buffs: List[CardBuff]):
        """
        Calculates effect's power.
        @param power: Effect's base power.
        @param power_range:
        @param buffs: Effect's buffs
        @return: Calculated power.
        """

        effect_power = self.__power_without_buffs__(power, power_range)
        effect_power = self.__calculate_buffs_influence__(effect_power, buffs)
        return effect_power

    def __power_without_buffs__(self, power, power_range):
        """
        Adds random value from [-power_range, power_range] to base power value.
        @param power: Base power value.
        @param power_range:
        @return:
        """
        return power + uniform(-1, 1) * power_range

    def __calculate_buffs_influence__(self, effect_power, buffs):
        """

        @param effect_power: Power + random range not affected by buffs.
        @param buffs: Effect's buffs.
        @return: Effect power changed by buffs.
        """

        multipliers_influence = 1
        modifiers_influence = 0

        multipliers_influence = self.__calculate_multipliers_influence__(buffs)
        modifiers_influence = self.__calculate_modifiers_influence__(buffs)

        return effect_power * multipliers_influence + modifiers_influence

    def __calculate_modifiers_influence__(self, buffs):
        """
        Modifier adds constant value to effect power.
        @param buffs: Effect's buffs.
        @return: Value to be added to effect power.
        """

        modifiers_sum = 0
        for buff in buffs:
            modifiers_sum += buff.modifier
        return modifiers_sum

    def __calculate_multipliers_influence__(self, buffs):
        """
        Multiplier changes effect power by multiplying it.
        @param buffs: Effect's buffs.
        @return: Value that should be used to change effect power by multiplication.
        """

        positive_multipliers = 1
        negative_multipliers = 1

        # Calculations - see examples below for better understanding.
        buff: CardBuff
        for buff in buffs:
            if buff.multiplier >= 1:
                positive_multipliers += buff.modifier - 1
            elif buff.multiplier < 1:
                negative_multipliers *= buff.modifier

        return positive_multipliers * negative_multipliers

        """
        Calculations examples:
    
        x1 = 100%
        
        # Only positive multipliers.
        x2 = 100% + (2-1)*100% = 200%
        x3 = 100% + (3-1)*100% = 300%
        x2, x3, x3 = 100% + (2-1)*100% + (3-1)*100% + (3-1)*100% = 600%
    
        # Only negative multipliers.
        x0.5 = 100% * 0.5 = 50%
        x0.5, x0.5 = 100% * 0.5 * 0.5 = 25%
    
        # Mix - positive and negative multipliers.
        x2, x0.5 = (100% + (2-1)*100%) * 0.5 = 100%
        x2, x2, x2, x0.25 = (100% + (2-1)*100% + (2-1)*100% + (2-1)*100%) * 0.25 = 100%
        x5, x2, x0.25, x0.5 = (100% + (5-1)*100% + (2-1)*100%) * 0.25 * 0.5 = 600% * 0.125 = 75%
        """
