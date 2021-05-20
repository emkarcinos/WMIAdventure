from typing import Optional

from battle.businesslogic.battle_recording.PlayerChange import PlayerChange


class PlayersChanges:
    def __init__(self, attacker_change: Optional[PlayerChange], defender_change: Optional[PlayerChange]):
        self.attacker_change = attacker_change
        self.defender_change = defender_change
