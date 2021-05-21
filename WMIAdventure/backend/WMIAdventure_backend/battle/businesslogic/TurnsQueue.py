from collections import deque

from .Player import Player


class TurnsQueue:
    """
    Manages players turns.
    """

    def __init__(self, attacker: Player, defender: Player):
        self.queue = deque()
        self.queue.append(attacker)
        self.queue.append(defender)

    def turn(self) -> Player:
        """
        Gets a player which is at the front of the queue, dequeues it, and puts it to the end of it.
        """

        player = self.queue.popleft()
        self.queue.append(player)

        return player

    def enqueue(self, player: Player) -> None:
        """
        Add a player to the end of the queue.
        """
        self.queue.append(player)
