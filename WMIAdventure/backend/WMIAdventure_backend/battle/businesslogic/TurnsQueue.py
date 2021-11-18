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
        Gets a player who should do turn now and puts him at the end of the queue.
        :return Player who should do turn now.
        """

        return self._get_from_front_and_enqueue()

    def _get_from_front_and_enqueue(self):
        """
        Gets player who is at the beginning of the queue and appends him at the end of it.
        :return: Player from the beginning of the queue.
        """

        player = self.queue.popleft()
        self.enqueue(player)
        return player

    def enqueue(self, player: Player) -> None:
        """
        Add a player to the end of the queue.
        """
        self.queue.append(player)
