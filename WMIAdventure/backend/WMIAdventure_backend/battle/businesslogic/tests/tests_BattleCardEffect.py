from unittest import TestCase

from cards.models import Card
from cards.models import CardEffect
from cards.models import CardInfo
from cards.models import CardLevel
from cards.models import CardLevelEffects
from ..BattleCardEffect import BattleCardEffect
from ..CardBuff import CardBuff


class BattleCardEffectTestCase(TestCase):
    def setUp(self) -> None:
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

        self.effect_model = card_effect

    def tearDown(self) -> None:
        CardInfo.objects.all().delete()

    def test_create_from_model(self):
        battle_effect = BattleCardEffect(self.effect_model)

    def test_buff_add(self):
        battle_effect = BattleCardEffect(self.effect_model)
        battle_effect.add_buff(CardBuff(active_turns=0))
        self.assertEqual(1, len(battle_effect.buffs))

    def test_remove_expired_buffs(self):
        battle_effect = BattleCardEffect(self.effect_model)
        battle_effect.add_buff(CardBuff(active_turns=0))
        battle_effect.update_buffs()
        self.assertEqual(0, len(battle_effect.buffs))
