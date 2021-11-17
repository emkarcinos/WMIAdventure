from typing import Optional

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.SimplifiedCard import SimplifiedCard
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact
from battle.businesslogic.recorder.simplified_players.TurnPlayer import TurnPlayer


class Turn:
    """
    Battle Turn class - holds information about one turn.

    Information about players' states will be recorded before card usage and effects activation,
    so that we know how players' states looked like at the beginning of the turn. (hp, armor, deck order)

    Stores array of used cards.
    Each used card object holds information about what effect was used and what impact this effect caused.
    """
    used_card: Optional[SimplifiedCard]

    def __init__(self, attacker: Player, defender: Player, card_executor: Player):
        self.attacker = TurnPlayer(attacker)
        self.defender = TurnPlayer(defender)
        self.card_executor_id = card_executor.id
        self.used_card = None
        self.used_effects = []

    def __str__(self):
        return f"Turn executor: {self.card_executor_id} used card id: {self.used_card.card_info_id} lvl: {self.used_card.level}"

    def record_card_usage(self, used_card: BattleCard):
        """
        Saves information about card used in this turn.
        :param used_card:
        """

        self.used_card = SimplifiedCard(used_card)

    def record_effect_usage(self, used_effect: EffectImpact):
        """
        Every effect usage in turn should be recorded using this method.
        :param used_effect:
        :raises AssertionError: If trying to record effect usage when there was no card usage recorded.
        """

        assert self.used_card is not None, "Card usage not recorded."
        self.used_effects.append(used_effect)

    def get_attacker(self) -> TurnPlayer:
        """
        Returns attacker Player object.
        """
        return self.attacker

    def get_defender(self) -> TurnPlayer:
        """
        Returns defender Player object.
        """
        return self.defender
