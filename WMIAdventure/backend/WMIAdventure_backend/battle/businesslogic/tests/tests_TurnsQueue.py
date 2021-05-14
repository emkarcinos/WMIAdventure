from unittest import TestCase

from ..BattlePlayer import BattlePlayer
from ..TurnsQueue import TurnsQueue


class TurnsQueueTestCase(TestCase):
    def setUp(self) -> None:
        self.player1 = BattlePlayer()
        self.player2 = BattlePlayer()
        self.queue = TurnsQueue(self.player1, self.player2)

    def test_queue_looping(self):
        iterations = 5
        for _ in range(5):
            first_player = self.queue.turn()
            self.assertEqual(first_player, self.player1)

            second_player = self.queue.turn()
            self.assertEqual(second_player, self.player2)

    def test_enqueue(self):
        self.queue.enqueue(self.player2)
        first_player = self.queue.turn()
        self.assertEqual(first_player, self.player1)

        second_player = self.queue.turn()
        self.assertEqual(second_player, self.player2)

        third_player = self.queue.turn()
        self.assertEqual(third_player, self.player2)

