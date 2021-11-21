from random import uniform

from battle.businesslogic.buffs.ModifierBuff import ModifierBuff


class Calculator:
    instance = None

    @staticmethod
    def get_instance():
        if Calculator.instance is None:
            Calculator.instance = Calculator()
        return Calculator.instance

    def calculate_effect_power(self, power, power_range, buffs: list[ModifierBuff]) -> int:
        """
        Calculates effect's power.
        @param power: Effect's base power.
        @param power_range:
        @param buffs: Effect's buffs
        @return: Calculated power.
        """

        effect_power = self._power_without_buffs(power, power_range)
        effect_power = self._calculate_buffs_influence(effect_power, buffs)
        return max(0, effect_power)

    def _power_without_buffs(self, power, power_range) -> int:
        """
        Calculates effect's power by adding random value from [-power_range, power_range]
        to base power value.
        @param power: Base power value.
        @param power_range: Value which defines range [-power_range, power_range].
        @return: Calculated effect's power without buffs influence.
        """
        return int(power + uniform(-1, 1) * power_range)

    def _calculate_buffs_influence(self, effect_power, buffs) -> int:
        """
        Calculates new effect's power with usage of buffs.
        @param effect_power: Effect's power not affected by buffs (base power + random range).
        @param buffs: Effect's buffs.
        @return: Effect's power changed by buffs.
        """

        multipliers_influence = 1
        modifiers_influence = 0

        multipliers_influence = self._calculate_multipliers_influence(buffs)
        modifiers_influence = self._calculate_modifiers_influence(buffs)

        return int(effect_power * multipliers_influence + modifiers_influence)

    def _calculate_modifiers_influence(self, buffs) -> int:
        """
        Modifier adds constant value to effect power.
        @param buffs: Effect's buffs.
        @return: Value to be added to effect power.
        """

        modifiers_sum = 0
        for buff in buffs:
            modifiers_sum += buff.modifier
        return modifiers_sum

    def _calculate_multipliers_influence(self, buffs) -> float:
        """
        Multiplier changes effect's power by multiplying it.
        @param buffs: Effect's buffs.
        @return: Value that should be used to change effect power by multiplication.
        """

        positive_multipliers = 1
        negative_multipliers = 1

        """
        Calculations - see examples below for better understanding.
        
        Positive multipliers - multipliers >= x1
        Negative multipliers - multipliers in range [x0, x1)
        
        There are several rules of multipliers calculations:
        1. Positive multipliers are being added, not multiplied:
            - combination of (x2, x2) multipliers gives us x3 multiplier, not x4
        2. Negative multipliers are being multiplied:
            - combination of (x0.5, x0.5) multipliers gives us x0.25 multiplier.
        3. Combining positive and negative multipliers is in given order:
            (positive_m1 + positive_m2 + ...) * (negative_m1 * negative_m2 * ...) 
        
        """
        buff: ModifierBuff
        for buff in buffs:
            if buff.multiplier >= 1:
                positive_multipliers += buff.multiplier - 1
            elif buff.multiplier < 1:
                negative_multipliers *= buff.multiplier

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
