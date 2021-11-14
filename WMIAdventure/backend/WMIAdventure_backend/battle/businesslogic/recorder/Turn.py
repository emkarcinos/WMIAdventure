from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.SimplifiedPlayer import SimplifiedPlayer
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact
from battle.businesslogic.recorder.simplified_cards.SimplifiedCard import SimplifiedCard


class Turn:
    """
    Battle Turn class - holds information about one turn.

    Information about players' states will be recorded before card usage and effects activation,
    so that we know how players' states looked like at the beginning of the turn. (hp, armor, deck order)

    Stores array of used cards.
    Each used card object holds information about what effect was used and what impact this effect caused.
    """

    def __init__(self, attacker: Player, defender: Player, card_executor: Player):
        self.attacker = SimplifiedPlayer(attacker)
        self.defender = SimplifiedPlayer(defender)
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
        """

        self.used_effects.append(used_effect)

    def get_attacker(self) -> SimplifiedPlayer:
        """
        Returns attacker Player object.
        """
        return self.attacker

    def get_defender(self) -> SimplifiedPlayer:
        """
        Returns defender Player object.
        """
        return self.defender
