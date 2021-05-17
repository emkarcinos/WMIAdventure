from unittest import TestCase

from battle.businesslogic.CardBuff import CardBuff


class CardBuffTestCase(TestCase):

    def test_buff_delayed_activation(self):
        delay = 2
        buff = CardBuff(activation_delay_turns=delay, active_turns=999)
        buff.update()
        self.assertFalse(buff.can_trigger())
        for _ in range(delay):
            buff.update()

        self.assertTrue(buff.can_trigger())

    def test_buff_expiration(self):
        timeout = 5
        buff = CardBuff(active_turns=timeout)
        buff.update()
        self.assertTrue(buff.can_trigger())
        for _ in range(timeout):
            buff.update()

        self.assertFalse(buff.can_trigger())