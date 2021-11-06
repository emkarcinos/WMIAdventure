from battle.businesslogic.Deck import Deck
from battle.businesslogic.recorder.SimplifiedCard import SimplifiedCard


class SimplifiedDeck:
    def __init__(self, deck: Deck):
        self.cards = tuple(list(SimplifiedCard(battle_card) for battle_card in deck.cards_queue))
