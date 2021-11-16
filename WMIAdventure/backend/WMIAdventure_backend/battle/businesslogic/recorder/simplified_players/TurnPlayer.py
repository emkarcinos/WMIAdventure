from battle.businesslogic.Player import Player
from battle.businesslogic.recorder.simplified_players.BaseSimplifiedPlayer import BaseSimplifiedPlayer


class TurnPlayer(BaseSimplifiedPlayer):
    """
    Stores player's data in concrete turn.

    This class is used in battle serialization.
    """

    def __init__(self, player: Player):
        super().__init__(player)

        self.deck = (battle_card.card_model.info.id for battle_card in list(player.deck.cards_queue))

        # When turns_stopped == 0 we do not want to include this field in serialization
        # TODO: Maybe there's a better solution to this problem, maybe in serializer itself
        if player.turns_stopped > 0:
            self.turns_stopped = player.turns_stopped
