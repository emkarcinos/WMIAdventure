from unittest import TestCase

from cards.models import CardLevelEffects, CardEffect
from ..Creator import Creator
from ...Deck import Deck
from ...Player import Player
from ...effects.TrueDamageEffect import TrueDamageEffect


class TrueDmgEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1 = cls.creator.get_user_models()[0]
        cls.d1 = cls.creator.get_decks()[0]

        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.TRUE_DMG)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=20.0,
            range=5.0
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1), 1)
        self.effect = TrueDamageEffect(self.effect_model)

    def test_dealing_dmg(self):
        self.card_owner.statistics.armour = 15.0
        initial_hp = self.card_owner.get_hp()

        self.effect.on_activation(self.card_owner, None)
        pow = self.effect.power
        range = self.effect.range
        self.assertGreaterEqual(initial_hp - (pow - range), self.card_owner.get_hp())
        self.assertLessEqual(initial_hp - (pow + range), self.card_owner.get_hp())

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
