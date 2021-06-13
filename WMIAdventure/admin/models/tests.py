from unittest import TestCase

from models.Card import Card
from models.Model import Model


class ModelTestCase(TestCase):
    def setUp(self) -> None:
        self.dict = {'key1': 'val1', 'key2': 'val2'}

    def test_create(self):
        model = Model(self.dict)

        self.assertEqual(model.key1, self.dict['key1'])
        self.assertEqual(model.key2, self.dict['key2'])


class CardModelTestCase(TestCase):
    def setUp(self) -> None:
        # Sample card as if it came from the API
        self.dict = {'name': 'test', 'subject': 'testsubject', 'image': None, 'tooltip': 'testtooltip',
                     'levels': [
                         {
                             'level': 1, 'next_level_cost': 1,
                             'effects': [
                                 {'card_effect': 1, 'target': 1, 'power': 1.0, 'range': 1.0}
                             ]
                         }
                     ]
                     }

    def test_creation(self):
        card = Card(self.dict)

        # Card params
        self.assertEqual(card.name, self.dict.get('name'))
        self.assertEqual(card.subject, self.dict.get('subject'))
        self.assertEqual(card.image, self.dict.get('image'))
        self.assertEqual(card.tooltip, self.dict.get('tooltip'))

        # Level objects inside
        dict_level = self.dict.get('levels')[0]
        card_level = card.levels[0]
        self.assertEqual(card_level.level, dict_level.get('level'))
        self.assertEqual(card_level.next_level_cost, dict_level.get('next_level_cost'))

        # Effects inside level
        dict_effect = dict_level.get('effects')[0]
        card_effect = card_level.effects[0]

        self.assertEqual(card_effect.card_effect, dict_effect.get('card_effect'))
        self.assertEqual(card_effect.target, dict_effect.get('target'))
        self.assertEqual(card_effect.power, dict_effect.get('power'))
        self.assertEqual(card_effect.range, dict_effect.get('range'))
