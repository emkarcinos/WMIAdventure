from unittest import TestCase

from battle.businesslogic.battle_recording.CardData import CardData


class CardDataTestCase(TestCase):
    def test_create(self):
        expected_card_id = 3
        expected_level = 1

        actual_card_data = CardData(expected_card_id, expected_level)

        self.assertEqual(actual_card_data.card_id, expected_card_id)
        self.assertEqual(actual_card_data.level, expected_level)
