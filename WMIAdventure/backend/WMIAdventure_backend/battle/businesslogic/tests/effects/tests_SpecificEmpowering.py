from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.EmpowerDamage import EmpowerDamage
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardLevelEffects, CardEffect


class SpecificEmpoweringTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1 = cls.creator.get_user_models()[0]
        d1 = cls.creator.get_decks()[0]
        cls.card_owner = Player(u1.id, Deck(d1), 1)
        card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.EMPOWER_DMG)

        target = CardLevelEffects.Target.PLAYER

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=card_effect_info_model,
            target=target,
            power=20.0,
            range=0.0
        )

    def test_empower_dmg(self):
        effect = EmpowerDamage(self.effect_model)
        effect.on_activation(self.card_owner, None)
        affected_card = self.card_owner.deck.lookup()

        # We check whether the effect got assigned properly
        affected_effect = affected_card.effects[0]
        self.assertEqual(len(affected_effect.buffs), 1)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
