from unittest import TestCase

from cards.factories import EffectData
from cards.models import CardEffect, Card
from cards.models import CardInfo
from cards.models import CardLevel
from cards.models import CardLevelEffects
from .factories import create_battle_card, BuffFactory, create_battle_card_with_effects
from ..BattleCard import BattleCard
from ..buffs.CardDuplicatedBuff import CardDuplicatedBuff


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

        self.assertEqual(battle_card.card_model.id, self.card_model.id)
        self.assertEqual(len(battle_card.effects), 1)
        self.assertIsNone(battle_card.card_duplicated_buff)

        self.assertEqual(battle_card.effects[0].target, self.effect_model.target)
        self.assertEqual(battle_card.effects[0].power, self.effect_model.power)
        self.assertEqual(battle_card.effects[0].range, self.effect_model.range)

    def test_doubled_property(self):
        """
        **Scenario:**

        - BattleCard exists and has CardDuplicatedBuff.

        - **A:** We check if this BattleCard is doubled.

        - We remove CardDuplicatedBuff from this BattleCard.

        - **B:** We check if this BattleCard is doubled.

        ---

        **Expected result:**

        - **A:** BattleCard is doubled.

        - **B:** BattleCard isn't doubled.
        """

        battle_card = create_battle_card()

        battle_card.card_duplicated_buff = CardDuplicatedBuff(battle_card.effects)
        self.assertTrue(battle_card.doubled)
        battle_card.card_duplicated_buff = None
        self.assertFalse(battle_card.doubled)

    def test_use(self):
        battle_card = BattleCard(self.card_model)

        battle_card.use()

        self.assertEqual(len(battle_card.effects), 1)
        self.assertEqual(battle_card.effects[0].target, self.effect_model.target)
        self.assertEqual(battle_card.effects[0].power, self.effect_model.power)
        self.assertEqual(battle_card.effects[0].range, self.effect_model.range)

    def test_use_when_card_is_doubled(self):
        """
        **Scenario:**

        - BattleCard exists, is doubled and has buffs which last only for one usage.

        - We use this BattleCard.

        ---

        **Expected result:**

        - BattleCard is no longer doubled

        - BattleCard still has buffs (because original card's buffs are not used when using duplicate)

        - Effects returned by usage of this doubled card shouldn't have buffs (because card's duplicate can't have buffs)
        """

        # Create doubled BattleCard with buffs.
        battle_card = create_battle_card()
        buffs = BuffFactory.create_batch(5, buff_type=None, active_turns=1)

        for buff in buffs:
            battle_card.assign_buff(buff)

        battle_card.card_duplicated_buff = CardDuplicatedBuff(battle_card.effects)

        # Use card
        returned_effects = battle_card.use()

        # Assert used card is no longer doubled
        self.assertIsNone(battle_card.card_duplicated_buff)

        # Assert original card still has the same buffs as before
        actual_buffs = battle_card.get_buffs()

        self.assertEqual(len(actual_buffs), len(buffs))

        for original_buff, actual_buff in zip(buffs, actual_buffs):
            self.assertEqual(actual_buff.buff_type, original_buff.buff_type)
            self.assertEqual(actual_buff.turns_remaining, original_buff.turns_remaining)
            self.assertEqual(actual_buff.multiplier, original_buff.multiplier)
            self.assertEqual(actual_buff.modifier, original_buff.modifier)
            self.assertEqual(actual_buff.sleep_remaining, original_buff.sleep_remaining)

        # Assert returned effects do not have buffs
        for returned_effect in returned_effects:
            self.assertEqual(len(returned_effect.buffs), 0)

    def test_get_buffs(self):
        """
        **Scenario:**

        - BattleCard exists with multiple effects.

        - We assign a few buffs to this card, which have generic buff_type -> they will be attached to all effects.
        (Each effect will have a copy of each buff)

        - We get all buffs from card.

        ---

        **Expected result:**

        - Returned buffs are unique - there are no duplicates.
        """

        # Create BattleCard with multiple effects.
        effects_data = [
            EffectData(CardEffect.EffectId.DMG, 10, 5),
            EffectData(CardEffect.EffectId.DMG, 10, 5),
            EffectData(CardEffect.EffectId.DMG, 10, 5),
            EffectData(CardEffect.EffectId.DMG, 10, 5)
        ]
        battle_card = create_battle_card_with_effects(effects_data)

        # Assign buffs to this card
        buffs = BuffFactory.create_batch(10, buff_type=None)
        for buff in buffs:
            battle_card.assign_buff(buff)

        # Get buffs from card
        actual_buffs = battle_card.get_buffs()

        # Assert that there are no duplicates
        self.assertEqual(len(actual_buffs), len(buffs))

        # Assert proper buffs are returned
        for actual_buff, original_buff in zip(actual_buffs, buffs):
            self.assertEqual(actual_buff.buff_type, original_buff.buff_type)
            self.assertEqual(actual_buff.turns_remaining, original_buff.turns_remaining)
            self.assertEqual(actual_buff.multiplier, original_buff.multiplier)
            self.assertEqual(actual_buff.modifier, original_buff.modifier)
            self.assertEqual(actual_buff.sleep_remaining, original_buff.sleep_remaining)

    def test_add_buff(self):
        # TODO: Implement after creating specific BattleCardEffects
        pass
