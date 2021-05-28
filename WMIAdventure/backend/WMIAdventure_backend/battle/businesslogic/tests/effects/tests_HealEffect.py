from unittest import TestCase

from battle.businesslogic.effects.HealEffect import HealEffect
from cards.models import CardLevelEffects, CardEffect
from battle.businesslogic.tests.Creator import Creator
from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player


class DmgEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1 = cls.creator.get_user_models()[0]
        d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(u1.id, Deck(d1))
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
        self.effect = HealEffect(self.effect_model)

    def test_healing(self):
        hp_before_heal = int(self.card_owner.statistics.MAX_HP / 2)  # 50

        expected_min_heal = self.effect_power - self.effect_range
        expected_max_heal = self.effect_power + self.effect_range

        for i in range(1000):
            self.card_owner.statistics.hp = hp_before_heal

            # Heal player
            self.effect.activate(self.card_owner, None, None)

            actual_heal = self.card_owner.statistics.hp - hp_before_heal
            self.assertGreaterEqual(actual_heal, expected_min_heal)
            self.assertLessEqual(actual_heal, expected_max_heal)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
