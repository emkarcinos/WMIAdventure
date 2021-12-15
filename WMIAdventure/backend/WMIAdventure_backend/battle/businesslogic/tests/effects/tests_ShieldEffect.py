from unittest import TestCase

from battle.businesslogic.effects.ShieldEffect import ShieldEffect
from cards.models import CardLevelEffects, CardEffect
from ..Creator import Creator
from ...Deck import Deck
from ...Player import Player


class ShieldEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1 = cls.creator.get_user_models()[0]
        d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(u1.id, Deck(d1), 1)
        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.SHIELD)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_power = 5.0
        cls.effect_range = 2.0
        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=cls.effect_power,
            range=cls.effect_range
        )

    def setUp(self) -> None:

        self.effect = ShieldEffect(self.effect_model)

    def test_shielding(self):

        self.effect.activate(self.card_owner, None, None)
        min = self.effect_power - self.effect_range
        max = self.effect_power + self.effect_range
        actual_armour = self.card_owner.statistics.armour
        self.assertGreaterEqual(actual_armour, min)
        self.assertLessEqual(actual_armour, max)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
