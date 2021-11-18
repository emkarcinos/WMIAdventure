from django.test import TestCase

from battle.businesslogic.recorder.effects_impacts.DeckOrderChangedEffectImpact import DeckOrderChangedEffectImpact
from battle.businesslogic.tests.factories import create_player_with_deck


class DeckOrderChangedEffectImpactTestCase(TestCase):
    def test_deck_has_proper_order(self):
        """
        **Scenario:**

        - DeckOrderChangedEffectImpact is created from some Deck.

        ---

        **Expected result:**

        - DeckOrderChangedEffectImpact stores cards ids in proper order.
        """

        _, deck = create_player_with_deck()

        # Create effect impact
        _ = 1
        effect_impact = DeckOrderChangedEffectImpact(_, _, deck)

        # Assert cards ids are in proper order
        for expected_card, actual_card_id in zip(deck.cards_queue, effect_impact.reordered_deck):
            expected_info_id = expected_card.card_model.info.id
            self.assertEquals(actual_card_id, expected_info_id)
