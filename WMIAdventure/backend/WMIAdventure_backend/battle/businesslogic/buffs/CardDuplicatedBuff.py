from copy import copy

from battle.businesslogic.effects.Effect import Effect


class CardDuplicatedBuff:
    """
    Purpose of this class is being attached to card, when duplicating it.

    If this buff is attached to card C, then it should be activated when using C to simulate usage of
    C's duplicate.

    When activated it creates copy of given card's effects and removes buffs from them.
    This class is useful, because card's duplicate shouldn't have any buffs.
    """
    card_effects: list[Effect]

    def __init__(self, card_effects):
        self.card_effects = card_effects

    def activate(self):
        """
        Creates copy of given card's effects and removes buffs from them.

        :return: Copy of card's effects without buffs.
        """

        effects_without_buffs = []
        for effect in self.card_effects:
            effects_without_buffs.append(
                self._get_effect_without_buffs(effect)
            )

        return effects_without_buffs

    def _get_effect_without_buffs(self, effect):
        """
        Copies given effect and removes buffs from it.
        :param effect:
        :return: Copy of given effect without buffs.
        """

        effect_without_buffs = copy(effect)
        effect_without_buffs.buffs = []
        return effect_without_buffs
