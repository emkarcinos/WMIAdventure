from battle.businesslogic.BattleCard import BattleCard


class SimplifiedCard:
    def __init__(self, battle_card: BattleCard):
        self.card_info_id = battle_card.card_model.info.id
        self.level = battle_card.card_model.level.level

        # If there are no buffs do not create property, so that serializer doesn't include
        # not needed nulls
        buffs = battle_card.get_buffs()
        if buffs:
            self.buffs = buffs

    def __str__(self):
        return f"Simplified Card id: {self.card_info_id} lvl: {self.level}"
