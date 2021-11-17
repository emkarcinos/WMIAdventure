from typing import List, Optional

from battle.businesslogic.buffs.ModifierBuff import ModifierBuff
from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.models import Card
from .buffs.CardDuplicatedBuff import CardDuplicatedBuff


class BattleCard:
    """

    """
    card_duplicated_buff: Optional[CardDuplicatedBuff]

    def __init__(self, card_model: Card):
        """
        Creates BattleCard instance.
        @param card_model: Database model.
        """

        self.card_model = card_model

        effects_factory = EffectFactory.get_instance()
        self.effects = []
        for effect_model in card_model.effects.all():
            self.effects.append(effects_factory.create(effect_model))

        self.turns_blocked = 0
        self.card_duplicated_buff = None

    def __str__(self):
        return f"Card info id {self.card_model.info.id} lvl: {self.card_model.level.level}"

    def _duplicate_being_used(self):
        """
        Handles using duplicate of this card.

        Returns effects without buffs (because duplicated card can't have buffs)
        and marks original card as not duplicated (because duplicate was used)

        :return: Effects without buffs to be used in battle simulation.
        """

        effects_without_buffs = self.card_duplicated_buff.activate()
        self.card_duplicated_buff = None
        return effects_without_buffs

    def use(self) -> List[Effect]:
        """
        Updates card's buffs and returns list of card's effects to be executed in battle simulation.
        @return: List of effects to be executed by battle simulator.
        """

        # When duplicate is being used we shouldn't update effects of the original card.
        if not self.doubled:
            self._update_effects()

        if self.turns_blocked > 0:
            self.turns_blocked -= 1
            return []  # If card is blocked it should be executed without effects.

        if self.doubled:
            return self._duplicate_being_used()

        return self.effects

    def _update_effects(self) -> None:
        for effect in self.effects:
            effect.update()

    def assign_buff(self, buff: ModifierBuff):
        """
        This method assigns a buff to this card's appropriate effects.
        @param: buff - ModifierBuff instance
        """
        for effect in self.effects:
            # We check if any of the effects is of the type specified in the buff_type
            # If we specified None in the buff_type, it applies to all effect types.
            card_type = effect.effect_model.card_effect.id
            if buff.buff_type is None or card_type == buff.buff_type:
                effect.add_buff(buff)

    def get_buffs(self):
        """
        :return: List of buffs assigned to effects of this card.
        """

        buffs = []

        # TODO: Test if duplicates are not appended to buffs array
        for effect in self.effects:
            for buff in effect.buffs:
                if buff not in buffs:
                    buffs.append(buff)

        return buffs

    @property
    def doubled(self):
        return self.card_duplicated_buff is not None
