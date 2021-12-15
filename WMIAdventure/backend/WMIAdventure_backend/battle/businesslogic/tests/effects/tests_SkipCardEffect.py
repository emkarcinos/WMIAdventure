from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.SkipCardEffect import SkipCardEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects


class SkipCardEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1 = cls.creator.get_user_models()[0]
        d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(u1.id, Deck(d1), 1)
        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.SKIP)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=None,
            range=None
        )

    def setUp(self) -> None:
        self.effect = SkipCardEffect(self.effect_model)

    def test_execution(self):
        top_card_before = self.card_owner.deck.lookup()
        self.effect.activate(self.card_owner, None, None)
        top_card_after = self.card_owner.deck.lookup()
        self.assertIsNot(top_card_before, top_card_after)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()