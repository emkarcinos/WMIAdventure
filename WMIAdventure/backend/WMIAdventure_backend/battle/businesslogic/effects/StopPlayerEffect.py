from battle.businesslogic.effects.Effect import Effect
from cards.models import CardLevelEffects


class StopPlayerEffect(Effect):
    """
    Stops Player for given amount of turns.
    """

    def __init__(self, effect_model: CardLevelEffects, turns_stopped: int = 1):
        """
        Creates instance of StopPlayerEffect.
        :param effect_model:
        :param turns_stopped: How many turns should player be stopped.
        """

        super().__init__(effect_model)
        self.turns_stopped = turns_stopped

    def on_activation(self, target, turns_queue):
        """
        Stops player.
        :param target: Who should be stopped.
        :param turns_queue:
        :return: None.
        """

        super().on_activation(target, turns_queue)
        target.turns_stopped += self.turns_stopped
        
    def description(self) -> str:
        return f"Zatrzymuje {self.target.label}a na {self.turns_stopped} turę"
