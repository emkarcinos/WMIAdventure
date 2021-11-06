from copy import copy

from battle.businesslogic.Buff import Buff
from battle.businesslogic.recorder.effects_impacts.EffectImpact import EffectImpact
from cards.businesslogic.description_generator.PowerDescription import PowerDescription
from cards.models import CardLevelEffects


class Effect:
    """
    Abstract class for card effects logic to derive from when creating concrete effect class.
    """

    def __init__(self, effect_model: CardLevelEffects):
        """
        Creates BattleCardEffect instance.
        @param effect_model: Database model.
        """

        self.effect_model = effect_model

        # This usage of Target constructor is to make sure self.target is Target object, not int
        self.target = CardLevelEffects.Target(effect_model.target)
        self.power = effect_model.power
        self.range = effect_model.range

        self.buffs: list[Buff]
        self.buffs = []

    def on_activation(self, target, turns_queue) -> EffectImpact:
        """
        Effect logic abstract method.
        One should override it and write the logic here.

        Overridden method should return concrete instance of EffectImpact.

        @param target: Target affected by this effect - BattlePlayer instance
        @param turns_queue: TurnsQueue instance.
        @return: EffectImpact instance
        """

        return EffectImpact(self.effect_model.card_effect.id, target.id)

    def activate(self,
                 card_owner,
                 other_player,
                 turns_queue) -> EffectImpact:
        """
        Triggers the effect.
        It essentially calls on_activation method that should be overridden to one's liking.

        @param card_owner: BattlePlayer instance.
        @param other_player: BattlePlayer instance.
        @param turns_queue: Queue of players' turns, can be changed by some effects.

        @return: EffectImpact which stores information about used effect, who was target and what changes activation
        of this effect caused.
        """

        selected_target = self.choose_target(card_owner, other_player)
        return self.on_activation(selected_target, turns_queue)

    def choose_target(self, card_owner, other_player):
        """
        Chooses effect target with usage of target enum field.
        @param card_owner: BattlePlayer instance.
        @param other_player: BattlePlayer instance.
        @return: Chosen effect target.
        """

        effect_target = None
        if self.target == CardLevelEffects.Target.OPPONENT:
            effect_target = other_player
        elif self.target == CardLevelEffects.Target.PLAYER:
            effect_target = card_owner
        return effect_target

    def add_buff(self, buff: Buff):
        """
        Add a new buff to the Effect.
        """

        """
        Copy of buff is appended. If buff was not copied then the same Buff object
        would be updated multiple times by multiple Effect objects in one turn.
        (Multiple Effect instances would have reference to the same Buff object)
        """
        self.buffs.append(copy(buff))

    def update_buffs(self):
        """
        Updates the buffs and destroys expired ones.
        """
        for buff in self.buffs:
            buff.update()

        self._remove_expired_buffs()

    def _remove_expired_buffs(self):
        """
        Removes expired buffs from list of buffs.
        """

        # Maybe there is a better way of doing this?
        for buff in self.buffs:
            if buff.is_expired():
                self.buffs.remove(buff)

    def update(self):
        """
        Update this effect's state.
        Should be called every turn before activation.
        """
        self.update_buffs()

    def description(self) -> str:
        """
        Get a pretty effect description.
        This description will be further used to generate a real description.
        Overload this method to create a description of your own.

        One can use self.target.label ("gracz" or "przeciwnik) with a suffix (eg. using formatted strings 
            f"{self.target.label}a" gets you "gracza" or "przeciwnika"
            
        Don't end the description with any separator or a comma.
        """
        power_range = PowerDescription.get_instance().stringify(self.power, self.range)
        return f"Efekt o mocy {power_range} skierowany w {self.target.label}a"
