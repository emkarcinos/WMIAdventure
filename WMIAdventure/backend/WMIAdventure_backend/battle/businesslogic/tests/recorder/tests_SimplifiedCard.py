from django.test import TestCase

from battle.businesslogic.buffs.CardDuplicatedBuff import CardDuplicatedBuff
from battle.businesslogic.recorder.SimplifiedCard import SimplifiedCard
from battle.businesslogic.tests.factories import create_battle_card, BuffFactory
from cards.models import CardEffect


class SimplifiedCardTestCase(TestCase):
    def test(self):
        """
        **Scenario:**

        - BattleCard has buffs, is blocked and doubled.
        - SimplifiedCard is created from this BattleCard.

        ---

        **Expected result:**

        - SimplifiedCard has proper data, proper buffs (including card duplicated buff) and contains info about blocked turns.
        """

        # Create battle card
        battle_card = create_battle_card()

        # Add modifier some buffs
        modifier_buffs_num = 5
        buffs = BuffFactory.create_batch(modifier_buffs_num)

        for buff in buffs:
            battle_card.assign_buff(buff)

        # Add duplication buff
        battle_card.card_duplicated_buff = CardDuplicatedBuff(battle_card.effects)

        # Block this card
        battle_card.turns_blocked = 2

        # Create SimplifiedCard
        simplified_card = SimplifiedCard(battle_card)

        # Assert basic data
        expected_info_id = battle_card.card_model.info.id
        actual_info_id = simplified_card.card_info_id

        self.assertEquals(actual_info_id, expected_info_id)

        expected_level = battle_card.card_model.level.level
        actual_level = simplified_card.level

        self.assertEquals(actual_level, expected_level)

        # Assert buffs size
        self.assertEquals(len(simplified_card.buffs),
                          len(battle_card.get_buffs()) + 1)  # +1 because of duplication buff

        # Assert there is duplication buff
        filter_ = filter(lambda b: b.buff_type == CardEffect.EffectId.DOUBLEACTION, simplified_card.buffs)
        contains_duplication_buff = len(list(filter_)) == 1

        self.assertTrue(contains_duplication_buff)

        # Assert modifier buffs data
        for expected_buff, actual_buff in zip(buffs, simplified_card.buffs[
                                                     1:]):  # Slice [1:], because duplication buff should be at index 0
            self.assertEquals(actual_buff.buff_type, expected_buff.buff_type)
            self.assertEquals(actual_buff.multiplier, expected_buff.multiplier)
            self.assertEquals(actual_buff.modifier, expected_buff.modifier)
            self.assertEquals(actual_buff.turns_remaining, expected_buff.turns_remaining)
            self.assertEquals(actual_buff.sleep_remaining, expected_buff.sleep_remaining)

        # Assert turns blocked
        self.assertEquals(simplified_card.turns_blocked, battle_card.turns_blocked)
