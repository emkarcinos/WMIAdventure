from time import sleep

from django.test import TestCase

from lib.ratelimit.ratelimit import get_usage


class RatelimitTestCase(TestCase):
    def setUp(self):
        self.missed_key_1 = 'missed_key_1'
        self.missed_key_2 = 'missed_key_2'
        self.missed_key_3 = 'missed_key_3'
        self.missed_key_4 = 'missed_key_4'
        self.missed_key_5 = 'missed_key_5'
        self.missed_key_6 = 'missed_key_6'

    def test_should_initialize_on_cache_miss(self):
        limit = 5
        expected_counter = 1
        seconds_expiry = 5
        usage = get_usage(self.missed_key_1, limit, 'seconds', seconds_expiry, True)
        self.assertEqual(usage.limit, limit)
        self.assertEqual(usage.counter, expected_counter)
        self.assertFalse(usage.should_limit)

    def test_should_initialize_without_hit(self):
        limit = 5
        expected_counter = 0
        usage = get_usage(self.missed_key_2, limit, 'minutes', 6, False)
        self.assertEqual(usage.limit, limit)
        self.assertEqual(usage.counter, expected_counter)
        self.assertFalse(usage.should_limit)

    def test_should_limit(self):
        limit = 2
        usage = get_usage(self.missed_key_3, limit, 'hours', 6, True)
        # First usage should not get limited
        self.assertFalse(usage.should_limit)

        usage1 = get_usage(self.missed_key_3, limit, 'hours', 6, True)
        # Second usage should not get limited
        self.assertFalse(usage1.should_limit)

        usage2 = get_usage(self.missed_key_3, limit, 'hours', 6, True)
        # Third usage should get limited
        self.assertTrue(usage2.should_limit)

    def test_should_return_correct_time_left(self):
        seconds_expiry = 5
        usage = get_usage(self.missed_key_4, 5, 'seconds', seconds_expiry, True)
        sleep(1)
        self.assertLess(usage.get_time_left(), seconds_expiry)

    def test_should_return_correct_time_left_on_multiple_hits(self):
        seconds_expiry = 5
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        sleep(1)
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        usage = get_usage(self.missed_key_5, 5, 'seconds', seconds_expiry, True)
        self.assertLess(usage.get_time_left(), seconds_expiry)

    def test_should_reset_counter_after_expiration(self):
        seconds_expiry = 1
        usage = get_usage(self.missed_key_6, 5, 'seconds', seconds_expiry, True)
        self.assertEqual(usage.counter, 1)
        sleep(2)
        usage = get_usage(self.missed_key_6, 5, 'seconds', seconds_expiry, True)
        self.assertEqual(usage.get_time_left(), seconds_expiry)
        self.assertEqual(usage.counter, 1)
