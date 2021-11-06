from battle.businesslogic.BattleCard import BattleCard


class SimplifiedCard:
    def __init__(self, battle_card: BattleCard):
        self.card_info_id = battle_card.card_model.info.id
        self.level = battle_card.card_model.level.level
