from unittest import TestCase
from cards.businesslogic.description_generator.PowerDescription import PowerDescription


class PowerDescriptionTestCase(TestCase):
    def setUp(self) -> None:
        self.gen = PowerDescription.get_instance()

    def test_zero_range(self):
        pow = 5
        range = 0

        output = self.gen.stringify(pow, range)
        self.assertEqual("5", output)

    def test_floats_with_zeros(self):
        pow = 5.5
        range = 1.5

        output = self.gen.stringify(pow, range)
        self.assertEqual("4 - 7", output)

    def test_floats_no_zeros(self):
        pow = 5.5
        range = 1

        output = self.gen.stringify(pow, range)
        self.assertEqual("4.5 - 6.5", output)
