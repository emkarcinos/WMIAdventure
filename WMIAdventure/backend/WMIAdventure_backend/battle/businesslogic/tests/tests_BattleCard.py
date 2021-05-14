from unittest import TestCase

from cards.models import Card
from cards.models import CardEffect
from cards.models import CardInfo
from cards.models import CardLevel
from cards.models import CardLevelEffects
from ..BattleCard import BattleCard


class BattleCardTestCase(TestCase):

    def setUp(self) -> None:
        card_info = CardInfo.objects.create(
            name="  ",
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

        self.card_model = card
        self.effect_model = card_effect

    def tearDown(self) -> None:
        CardInfo.objects.all().delete()

    def test_create_from_model(self):
        battle_card = BattleCard(self.card_model)

    def test_use(self):
        battle_card = BattleCard(self.card_model)

        battle_card.use()

        self.assertEqual(len(battle_card.effects), 1)
        self.assertEqual(battle_card.effects[0].target, self.effect_model.target)
        self.assertEqual(battle_card.effects[0].power, self.effect_model.power)
        self.assertEqual(battle_card.effects[0].range, self.effect_model.range)
