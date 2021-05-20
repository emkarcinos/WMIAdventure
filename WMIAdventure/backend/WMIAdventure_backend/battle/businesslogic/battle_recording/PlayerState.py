from typing import List

from battle.businesslogic.BattleDeck import BattleDeck
from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect
from cards.models import CardLevelEffects, CardEffect
from ..BattlePlayer import BattlePlayer
from ..BattleCard import BattleCard
from .CardData import CardData
from .PlayerChange import PlayerChange


class PlayerState:
    player_deck: List[CardData]

    def __init__(self, battle_player: BattlePlayer):
        self.player = battle_player
        self.hp = battle_player.statistics.hp
        self.armour = battle_player.statistics.armour

        self.next_card_number = 1

        self.player_deck = self.__create__deck__(battle_player.deck)

    def __create__deck__(self, deck: BattleDeck):
        player_deck = []

        battle_card: BattleCard
        for battle_card in list(deck.cards_queue):
            card_id = battle_card.card_model.info.id
            level = battle_card.card_model.level.level
            player_deck.append(CardData(card_id, level))

        return player_deck

    def update(self):
        player_change = PlayerChange(self.player.id,
                                     self.hp, self.player.statistics.hp,
                                     self.armour, self.player.statistics.armour)

        if player_change.hp is not None:
            self.hp += player_change.hp
            if self.hp <= 0:
                player_change.defeated = True
        if player_change.armour is not None:
            self.armour += player_change.armour

        return player_change

    def update_next_card_number(self):
        self.next_card_number += 1
        if self.next_card_number > 5:
            self.next_card_number = 1
