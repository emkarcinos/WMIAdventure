class PowerDescription:
    """
    A small singleton class that generates a string representing effect power.
    """

    instance = None

    @staticmethod
    def get_instance():
        if PowerDescription.instance is None:
            PowerDescription.instance = PowerDescription()

        return PowerDescription.instance
    
    def _remove_trailing_zeros_in_float(self, number: float) -> str:
        text = str(number)
        if "." in text:
            text = text.rstrip('0').rstrip(r'.')
        return text

    def _get_power_range(self, power: float, range: float) -> tuple[float, float]:
        """
        Returns a range of possible final power value.
        """
        min_val = max(0.0, power - range)
        max_val = power + range

        return min_val, max_val

    def stringify(self, power: float, range: float) -> str:
        """
        Converts power / range values to a representative string.
        """
        min_val, max_val = self._get_power_range(power, range)

        if min_val == max_val:
            return str(power)
        
        min_val = self._remove_trailing_zeros_in_float(min_val)
        max_val = self._remove_trailing_zeros_in_float(max_val)
        return f"{min_val} - {max_val}"
