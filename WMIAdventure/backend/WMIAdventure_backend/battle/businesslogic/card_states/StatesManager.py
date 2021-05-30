from battle.businesslogic.card_states.CardState import CardState
from battle.businesslogic.card_states.StatesQueue import StatesQueue


class StatesManager:
    """
    Manages card's states.
    It is responsible for knowing which state is card currently in, calling appropriate methods on current state.
    """

    current_state: CardState or None

    def __init__(self):
        self.states_queue = StatesQueue()
        self.current_state = None

    def on_card_use(self, effects_to_use):
        self.__update_state__()

        if self.current_state is not None:
            self.current_state.on_card_use(effects_to_use)

    def add_state(self, state: CardState):
        self.states_queue.enqueue(state)

    def __update_state__(self):
        if self.current_state is not None:
            self.current_state.update()
            if not self.current_state.active:
                self.current_state = self.states_queue.get_next_card_state()
