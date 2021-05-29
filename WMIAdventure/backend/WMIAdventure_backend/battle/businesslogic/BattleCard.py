from copy import copy
from typing import List, Union

from battle.businesslogic.card_states.CardState import CardState
from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.effects.EffectFactory import EffectFactory
from cards.models import Card, CardEffect
from .Buff import Buff


class BattleCard:
    """

    """
    states: List[CardState]

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

        self.states = []

    def use(self) -> List[Effect]:
        """
        Updates card's effects and states.
        @return: List of effects to be executed by battle simulator.
        """

        self.__update__()

        effects_to_use = copy(self.effects)

        for state in self.states:
            state.card_used(effects_to_use)

        return effects_to_use

    def add_state(self, state: CardState):
        """
        Adds state to card
        :param state: State to add.
        :return: None.
        """

        self.states.append(state)

    def __update_effects__(self) -> None:
        """
        Updates card's effects.
        :return: None.
        """

        for effect in self.effects:
            effect.update()

    def assign_buff(self, buff: Buff, effect_type: Union[CardEffect.EffectId, None] = None):
        """
        This method assigns a buff to this card's appropriate effects.
        @param: buff - Buff instance
        @param: effect_type - Enum that will determine which effect will be boosted
        """
        for effect in self.effects:
            # We check if any of the effects if of the type specified in the parameter
            # If we specified none, it applies to all effect types.
            card_type = effect.effect_model.card_effect.id
            if effect_type is None or card_type == effect_type:
                effect.add_buff(buff)

    def __update_states__(self):
        """
        Updates card's states and removes not active ones.
        :return: None.
        """

        for state in self.states:
            state.update()

        self.__remove_inactive_states__()

    def __update__(self):
        """
        Updates card by updating effects and states.
        :return: None.
        """

        self.__update_effects__()
        self.__update_states__()

    def __remove_inactive_states__(self):
        """
        Removes states that are not active.
        :return: None.
        """

        state: CardState
        for state in self.states:
            if not state.active:
                self.states.remove(state)
