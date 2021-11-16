from unittest import TestCase

from battle.businesslogic.Player import Player
from battle.businesslogic.buffs.Buff import Buff
from battle.businesslogic.effects.Effect import Effect
from battle.businesslogic.tests.Creator import Creator
from cards.models import Card
from cards.models import CardEffect
from cards.models import CardInfo
from cards.models import CardLevel
from cards.models import CardLevelEffects


class EffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        card_info = CardInfo.objects.create(
            name="Name",
            tooltip="Tooltip",
            image=None,
            subject=None
        )
        card_info.save()

        card = Card.objects.create(
            info=card_info,
            level=CardLevel.objects.get(pk=1),
            next_level_cost=None
        )
        card.save()

        card_effect = CardLevelEffects.objects.create(
            card=card,
            card_effect=CardEffect.objects.get(pk=1),
            target=CardLevelEffects.Target.OPPONENT,
            power=5,
            range=2
        )
        card_effect.save()

        cls.effect_model = card_effect

        cls.creator = Creator()
        u1, u2 = cls.creator.get_user_models()
        d1, d2 = cls.creator.get_decks()

        cls.card_owner = Player(u1.id, d1)
        cls.other_player = Player(u1.id, d2)

    def setUp(self) -> None:
        self.effect = Effect(self.effect_model)

    def test_buff_add(self):
        self.effect.add_buff(Buff(active_turns=0))
        self.assertEqual(1, len(self.effect.buffs))

    def test_remove_expired_buffs(self):
        self.effect.add_buff(Buff(active_turns=0))
        self.effect.update_buffs()
        self.assertEqual(0, len(self.effect.buffs))

    def test_choose_target(self):
        chosen_target = self.effect.choose_target(self.card_owner, self.other_player)

        expected_target = None
        if self.effect.target == CardLevelEffects.Target.OPPONENT:
            expected_target = self.other_player
        elif self.effect.target == CardLevelEffects.Target.PLAYER:
            expected_target = self.card_owner

        self.assertIs(chosen_target, expected_target)

    def test_description(self):
        description = self.effect.description()
        expected_description = "Efekt o mocy 3 - 7 skierowany w przeciwnika"
        self.assertEqual(description, expected_description)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
        CardInfo.objects.all().delete()
