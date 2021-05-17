from django.test import TestCase

from .Creator import Creator
from ..BattleCard import BattleCard
from ..CardBuff import CardBuff


class CardBuffTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()
        cls.card_model = cls.creator.get_cards()[0]
        cls.battle_card = BattleCard(cls.card_model)

    def setUp(self) -> None:
        self.turns_active = 1
        self.buff = CardBuff(self.turns_active, self.battle_card)

    def test_creation(self):
        self.assertEqual(self.buff.turns_active, self.turns_active)
        self.assertIs(self.buff.attached_to, self.battle_card)

    def test_update(self):
        self.buff.update()

        self.assertEqual(self.buff.turns_active, self.turns_active - 1)
        self.assertFalse(self.buff.active)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
