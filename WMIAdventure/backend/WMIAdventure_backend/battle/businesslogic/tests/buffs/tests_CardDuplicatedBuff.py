from django.test import TestCase

from battle.businesslogic.buffs.CardDuplicatedBuff import CardDuplicatedBuff
from battle.businesslogic.tests.factories import create_effect, BuffFactory
from cards.models import CardEffect


class CardDuplicatedBuffTestCase(TestCase):
    def test_creation(self):
        """
        **Scenario:**

        - CardDuplicatedBuff is created.

        ---

        **Expected result:**

        - Created buff has proper buff_type.
        """

        buff = CardDuplicatedBuff([])
        self.assertEquals(buff.buff_type, CardEffect.EffectId.DOUBLEACTION)

    def test_activate(self):
        """
        **Scenario:**

        - CardDuplicatedBuff is created with list of effects. This effects have buffs.

        - Buff is activated.

        ---

        **Expected result:**

        - Buff activation returns copy of effects, but without buffs. Original effects still have buffs.
        """

        effect1 = create_effect()
        effect1_buffs = BuffFactory.create_batch(2)
        effect1.buffs = effect1_buffs

        effect2 = create_effect()
        effect2_buffs = BuffFactory.create_batch(3)
        effect2.buffs = effect2_buffs

        original_effects = [effect1, effect2]

        # Create CardDuplicatedBuff
        buff = CardDuplicatedBuff(original_effects)

        # Activate buff
        effects_without_buffs = buff.activate()

        # Assert effects lists are the same size
        self.assertEquals(len(effects_without_buffs), len(original_effects))

        # Assert returned list of effects is in proper order
        for effect_without_buffs, original_effect in zip(effects_without_buffs, original_effects):
            expected_effect_id = original_effect.effect_model.card_effect.id
            actual_id = effect_without_buffs.effect_model.card_effect.id

            self.assertEquals(actual_id, expected_effect_id)

        # Assert there are no buffs in returned list of effects
        for effect in effects_without_buffs:
            self.assertEquals(len(effect.buffs), 0)

        # Assert original effects still have buffs
        self.assertEquals(len(effect1.buffs), len(effect1_buffs))
        self.assertEquals(len(effect2.buffs), len(effect2_buffs))

        for original_buff, actual_buff in zip(effect1_buffs, effect1.buffs):
            self.assertEquals(actual_buff.buff_type, original_buff.buff_type)
            self.assertEquals(actual_buff.modifier, original_buff.modifier)
            self.assertEquals(actual_buff.multiplier, original_buff.multiplier)

        for original_buff, actual_buff in zip(effect2_buffs, effect2.buffs):
            self.assertEquals(actual_buff.buff_type, original_buff.buff_type)
            self.assertEquals(actual_buff.modifier, original_buff.modifier)
            self.assertEquals(actual_buff.multiplier, original_buff.multiplier)
