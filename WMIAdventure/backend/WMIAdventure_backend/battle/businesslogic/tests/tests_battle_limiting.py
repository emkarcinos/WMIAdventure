from django.test import TestCase
from django.utils import timezone
from battle.businesslogic.battle_limiting import get_max_fights
from battle.businesslogic.battle_limiting import get_battle_limit_duration
from battle.businesslogic.battle_limiting import get_user_fights_record
from battle.businesslogic.battle_limiting import can_user_fight
from battle.businesslogic.battle_limiting import clear_records
from unittest.mock import patch


class BattleLimitingTestCase(TestCase):

    def setUp(self):
        self.user_id = 1

    def test_can_user_fight(self):
        # Assert no fight records
        user_record = get_user_fights_record(self.user_id)
        self.assertIsNone(user_record)

        now = timezone.now()

        # Fight
        self.assertTrue(can_user_fight(self.user_id))

        # Assert this fight is saved and assert proper time till reset
        expected_fights_count = 1
        expected_minimal_battle_limit_reset_date = now + get_battle_limit_duration()
        expected_maximal_battle_limit_reset_date = now + get_battle_limit_duration() + timezone.timedelta(seconds=5)

        user_record = get_user_fights_record(self.user_id)

        self.assertEquals(user_record.fights_count, expected_fights_count)
        self.assertGreaterEqual(user_record.battle_limit_reset_date, expected_minimal_battle_limit_reset_date)
        self.assertLessEqual(user_record.battle_limit_reset_date, expected_maximal_battle_limit_reset_date)


    def test_can_user_fight_multiple_times(self):
        fights_count = 10

        for i in range(fights_count):
            self.assertTrue(can_user_fight(self.user_id))

        user_fights_record = get_user_fights_record(self.user_id)

        expected_fights_count = fights_count
        self.assertEquals(user_fights_record.fights_count, expected_fights_count)

    def test_can_user_fight_fights_limit_exceeded(self):
        fights_over_limit = 5

        for i in range(get_max_fights()):
            self.assertTrue(can_user_fight(self.user_id))

        for i in range(fights_over_limit):
            self.assertFalse(can_user_fight(self.user_id))

        user_record = get_user_fights_record(self.user_id)

        self.assertEquals(user_record.fights_count, get_max_fights())

    def test_user_can_fight_after_limit_duration_passed(self):
        for i in range(get_max_fights()):
            self.assertTrue(can_user_fight(self.user_id))

        self.assertFalse(can_user_fight(self.user_id))

        mock_now = timezone.now() + get_battle_limit_duration() * 2
        # Assert that after battle limit duration time user can fight
        with patch('battle.businesslogic.battle_limiting.timezone.now', return_value=mock_now):
            self.assertTrue(can_user_fight(self.user_id))

        user_record = get_user_fights_record(self.user_id)

        # Assert that reset time is set properly and also that fights count is being reset to 1
        expected_fights_count = 1
        expected_battle_limit_reset_date = mock_now + get_battle_limit_duration()
        self.assertEquals(user_record.battle_limit_reset_date, expected_battle_limit_reset_date)
        self.assertEquals(user_record.fights_count, expected_fights_count)
        

    def tearDown(self) -> None:
        clear_records()
        return super().tearDown()
