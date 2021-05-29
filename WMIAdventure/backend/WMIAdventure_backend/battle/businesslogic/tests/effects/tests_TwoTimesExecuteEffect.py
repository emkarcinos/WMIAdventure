from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.TwoTimesExecuteEffect import TwoTimesExecuteEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects


class TwoTimesExecuteEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1 = cls.creator.get_user_models()[0]
        d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(u1.id, Deck(d1))
        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.DOUBLEACTION)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=None,
            range=None
        )

    def setUp(self) -> None:
        self.effect = TwoTimesExecuteEffect(self.effect_model)

    def test_integration_with_deck(self):
        # This card executes the effect
        card_with_effect = self.card_owner.deck.get_card()
        self.effect.on_activation(self.card_owner, None)

        # Next card can't be the same one as the one that held the effect
        first_card = self.card_owner.deck.get_card()
        self.assertIsNot(card_with_effect, first_card)
        # Next card has to be the same as the previous one
        second_card = self.card_owner.deck.get_card()
        self.assertIs(first_card, second_card)

        # This one should be different
        third_card = self.card_owner.deck.get_card()
        self.assertIsNot(first_card, third_card)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
