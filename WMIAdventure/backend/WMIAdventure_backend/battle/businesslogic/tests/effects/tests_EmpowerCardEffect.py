from unittest import TestCase

from battle.businesslogic.effects.EmpowerCardEffect import EmpowerCardEffect
from cards.models import CardLevelEffects, CardEffect
from battle.businesslogic.tests.Creator import Creator
from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player


class EmpowerCardEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1 = cls.creator.get_user_models()[0]
        cls.d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(cls.u1.id, Deck(cls.d1))
        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.EMPOWER)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=20.0,
            range=0.0
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1))

    def test_empower_any(self):
        effect_any = EmpowerCardEffect(self.effect_model)
        effect_any.on_activation(self.card_owner, None)
        affected_card = self.card_owner.deck.lookup()

        # We check whether the effect got assigned properly
        affected_effect = affected_card.effects[0]
        self.assertEqual(len(affected_effect.buffs), 1)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
