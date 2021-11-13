from unittest import TestCase

from battle.businesslogic.effects.TwoTimesExecuteEffect import TwoTimesExecuteEffect
from battle.businesslogic.tests.factories import create_player_with_deck, BuffFactory
from cards.factories import create_card_with_effect
from cards.models import CardEffect, CardLevelEffects, Card
from users.models import User


class TwoTimesExecuteEffectTestCase(TestCase):
    card_with_two_times_execute_effect: Card = None

    @classmethod
    def setUpClass(cls) -> None:
        cls.card_with_two_times_execute_effect = create_card_with_effect(
            CardEffect.EffectId.DOUBLEACTION,
            target=CardLevelEffects.Target.PLAYER
        )

        cls.effect = TwoTimesExecuteEffect(cls.card_with_two_times_execute_effect.effects.first())

    def setUp(self) -> None:
        # Create player and his deck
        self.card_owner, self.deck = create_player_with_deck()

    def tearDown(self) -> None:
        User.objects.get(pk=self.card_owner.id).delete()

    def test_effect_usage(self):
        """
        **Scenario:**

        - Card which will be doubled has buffs.
        - TwoTimesEffect is executed.
        - Duplicate of this card is executed.

        ---

        **Expected result:**

        - Appropriate card is duplicated.
        - When this card is used there should be no buffs in returned effects list.
        - After this card is used it shouldn't be doubled.
        """

        # Add buffs to card that should be doubled (this is card at the top of the deck)
        doubled_card = self.deck.lookup()
        for buff in BuffFactory.create_batch(10):
            doubled_card.assign_buff(buff)

        # Activate effect
        self.effect.activate(self.card_owner, None, None)

        # Assert first card in deck is doubled
        self.assertIsNotNone(doubled_card.card_duplicated_buff)

        # Use card
        effects_list = doubled_card.use()

        # Assert there are no buffs in effects_list
        for effect in effects_list:
            self.assertEquals(len(effect.buffs), 0)

        # Assert card is no longer duplicated
        self.assertIsNone(doubled_card.card_duplicated_buff)

    def test_integration_with_deck(self):
        """
        **Scenario:**

        - TwoTimesEffect is executed.
        - Player is using card.

        ---

        **Expected result:**

        - Appropriate card is duplicated.
        - When doubled card is used then it's duplicate should be used and card should still be at the top of the deck.
        - After duplicate was used then card should no longer be doubled.
        """

        # Activate effect
        self.effect.activate(self.card_owner, None, None)

        # Assert first card in deck is doubled
        doubled_card = self.deck.lookup()
        self.assertIsNotNone(doubled_card.card_duplicated_buff)

        # Use card
        used_card, effects_list = self.card_owner.use_card()

        # Assert that used card and doubled card are the same objects
        self.assertIs(doubled_card, used_card)

        # Assert that after usage card is no longer duplicated
        self.assertIsNone(doubled_card.card_duplicated_buff)

        # Assert that original card is still at the top of the deck
        card_at_the_top = self.deck.lookup()
        self.assertIs(doubled_card, card_at_the_top)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.card_with_two_times_execute_effect.delete()
