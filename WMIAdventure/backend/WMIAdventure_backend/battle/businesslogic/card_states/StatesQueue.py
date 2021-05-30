from collections import deque

from battle.businesslogic.card_states.CardState import CardState


class StatesQueue:
    """
    Queue of card's states.
    """

    def __init__(self):
        self.queue = deque()

    def get_next_card_state(self):
        """
        Returns state which was added first.
        :return: Card state.
        """

        return self.queue.popleft()

    def enqueue(self, state: CardState) -> None:
        """
        Add state to the end of the queue.
        """

        self.queue.append(state)
