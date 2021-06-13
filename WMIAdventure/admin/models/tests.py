from unittest import TestCase

from models.Model import Model


class ModelTestCase(TestCase):
    def setUp(self) -> None:
        self.dict = {'key1': 'val1', 'key2': 'val2'}

    def test_create(self):
        model = Model(self.dict)

        self.assertEqual(model.key1, self.dict['key1'])
        self.assertEqual(model.key2, self.dict['key2'])
