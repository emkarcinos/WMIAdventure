from unittest import TestCase

from battle.businesslogic.BattlePlayer import BattlePlayer
from battle.businesslogic.CardBuff import CardBuff
from battle.businesslogic.effects.BattleCardEffect import BattleCardEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import Card
from cards.models import CardEffect
from cards.models import CardInfo
from cards.models import CardLevel
from cards.models import CardLevelEffects


class BattleCardEffectTestCase(TestCase):
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

        cls.card_owner = BattlePlayer(u1.id, d1)
        cls.other_player = BattlePlayer(u1.id, d2)

    def setUp(self) -> None:
        self.battle_effect = BattleCardEffect(self.effect_model)

    def test_buff_add(self):
        self.battle_effect.add_buff(CardBuff(active_turns=0))
        self.assertEqual(1, len(self.battle_effect.buffs))

    def test_remove_expired_buffs(self):
        self.battle_effect.add_buff(CardBuff(active_turns=0))
        self.battle_effect.update_buffs()
        self.assertEqual(0, len(self.battle_effect.buffs))

    def test_choose_target(self):
        chosen_target = self.battle_effect.choose_target(self.card_owner, self.other_player)

        expected_target = None
        if self.battle_effect.target == CardLevelEffects.Target.OPPONENT:
            expected_target = self.other_player
        elif self.battle_effect.target == CardLevelEffects.Target.PLAYER:
            expected_target = self.card_owner

        self.assertIs(chosen_target, expected_target)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
        CardInfo.objects.all().delete()
