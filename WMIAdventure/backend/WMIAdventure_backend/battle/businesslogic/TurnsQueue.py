from .BattlePlayer import BattlePlayer
from collections import deque


class TurnsQueue:
    """
    Manages players turns.
    """

    def __init__(self, attacker: BattlePlayer, defender: BattlePlayer):
        self.queue = deque()
        self.queue.append(attacker)
        self.queue.append(defender)

    def turn(self) -> BattlePlayer:
        """
        Gets a player which is at the front of the queue, dequeues it, and puts it to the end of it.
        """

        player = self.queue.popleft()
        self.queue.append(player)

        return player

    def enqueue(self, player: BattlePlayer) -> None:
        """
        Add a player to the end of the queue.
        """
        self.queue.append(player)