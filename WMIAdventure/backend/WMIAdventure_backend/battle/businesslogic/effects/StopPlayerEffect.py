from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.player_states.StoppedPlayerState import StoppedPlayerState
from cards.models import CardLevelEffects


class StopPlayerEffect(Effect):
    """
    Stops target player for given amount of turns.
    """

    def __init__(self, effect_model: CardLevelEffects, turns_stopped: int=1):
        """

        :param effect_model:
        :param turns_stopped: For how many turns player should be stopped.
        """

        super().__init__(effect_model)
        self.turns_stopped = turns_stopped

    def on_activation(self, target, turns_queue):
        target.add_state(StoppedPlayerState(self.turns_stopped))
