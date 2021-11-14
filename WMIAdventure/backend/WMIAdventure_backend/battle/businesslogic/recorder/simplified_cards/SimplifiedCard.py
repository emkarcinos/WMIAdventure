from battle.businesslogic.recorder.simplified_cards.BaseSimplifiedCard import BaseSimplifiedCard


class SimplifiedCard(BaseSimplifiedCard):
    def __init__(self, battle_card):
        super().__init__(battle_card)

        # If there are no buffs do not create property, so that serializer doesn't include
        # not needed nulls
        buffs = battle_card.get_buffs()
        if buffs:
            self.buffs = buffs

        # When turns_blocked == 0 we do not want to include this field in serialization
        # TODO: Maybe there's a better solution to this problem, maybe in serializer itself
        if battle_card.turns_blocked > 0:
            self.turns_blocked = battle_card.turns_blocked

        if battle_card.card_duplicated_buff:
            self.doubled = True
            self.duplicate = BaseSimplifiedCard(battle_card)

    def __str__(self):
        return f"Simplified Card id: {self.card_info_id} lvl: {self.level}"
