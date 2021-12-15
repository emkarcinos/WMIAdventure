from unittest import TestCase

from battle.businesslogic.effects.DmgEffect import DmgEffect
from cards.models import CardLevelEffects, CardEffect
from ..Creator import Creator
from ...Deck import Deck
from ...Player import Player


class DmgEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1, cls.u2 = cls.creator.get_user_models()
        cls.d1, cls.d2 = cls.creator.get_decks()

        cls.card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.DMG)

        cls.target = CardLevelEffects.Target.OPPONENT

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=cls.card_effect_info_model,
            target=cls.target,
            power=5.0,
            range=1.0
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1), 1)
        self.other_player = Player(self.u2.id, Deck(self.d2), 1)

        self.other_player.statistics.armour = 0

        self.dmg_effect = DmgEffect(self.effect_model)

    def test_dealing_dmg(self):
        dmg_receiver = None
        if self.dmg_effect.target == CardLevelEffects.Target.OPPONENT:
            dmg_receiver = self.other_player
        elif self.dmg_effect.target == CardLevelEffects.Target.PLAYER:
            dmg_receiver = self.card_owner

        MAX_HP = dmg_receiver.statistics.MAX_HP
        max_dmg = self.dmg_effect.power + self.dmg_effect.range
        min_dmg = self.dmg_effect.power - self.dmg_effect.range

        for i in range(100):
            dmg_receiver.statistics.hp = MAX_HP

            self.dmg_effect.activate(self.card_owner, self.other_player, None)

            self.assertGreaterEqual(dmg_receiver.statistics.hp, MAX_HP - max_dmg)
            self.assertLessEqual(dmg_receiver.statistics.hp, MAX_HP - min_dmg)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
