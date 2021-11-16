class SimplifiedCard:
    def __init__(self, battle_card):
        self.card_info_id = battle_card.card_model.info.id
        self.level = battle_card.card_model.level.level

        buffs = self._get_all_buffs_from_card(battle_card)

        # If there are no buffs do not create property, so that serializer doesn't include not needed nulls
        if buffs:
            self.buffs = buffs

        # When turns_blocked == 0 we do not want to include this field in serialization
        # TODO: Maybe there's a better solution to this problem, maybe in serializer itself
        if battle_card.turns_blocked > 0:
            self.turns_blocked = battle_card.turns_blocked

    def __str__(self):
        return f"Simplified Card id: {self.card_info_id} lvl: {self.level}"

    def _get_all_buffs_from_card(self, battle_card):
        buffs = []

        if battle_card.card_duplicated_buff:
            buffs.append(battle_card.card_duplicated_buff)

        buffs.extend(battle_card.get_buffs())

        return buffs
