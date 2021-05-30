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

        self._perform_turns_of_stopped_players()
        player = self._get_from_front_and_enqueue()
        return player

    def _perform_turns_of_stopped_players(self):
        """
        Performs "empty" turns of stopped players until player who is not stopped is present at the front of the queue.
        """

        while self.queue[0].turns_stopped > 0:  # Check if player at the front of queue is stopped
            """
            If player at the front of queue is stopped - remove him from the front of queue and enqueue him at the back
            of it.
            """
            player = self._get_from_front_and_enqueue()
            player.turns_stopped -= 1  # Player "performed" one stopped turn - subtract it from stopped turns counter

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
