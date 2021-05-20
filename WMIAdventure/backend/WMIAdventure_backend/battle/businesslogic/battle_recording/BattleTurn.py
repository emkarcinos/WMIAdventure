from battle.businesslogic.battle_recording.PlayersChanges import PlayersChanges


class BattleTurn:
    def __init__(self, card_executor_id, used_card_number: int, players_changes: PlayersChanges):
        self.card_executor_id = card_executor_id
        self.used_card_number = used_card_number  # 1 for first card in deck, 2 for second card in deck ...
        self.players_changes = players_changes
