from django.test import TestCase
from .models import CardLevel
from django.db.utils import IntegrityError


class CardLevelTestCase(TestCase):
    def setUp(self):
        pass

    def test_name_after_creation(self):
        CardLevel.objects.create(level=CardLevel.Level(1))
        c_lvl = CardLevel.objects.get(level=1)

        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_with_int(self):
        c_lvl = CardLevel.objects.create(level=1)

        self.assertIsInstance(c_lvl.level, CardLevel.Level)
        self.assertEqual(c_lvl.name, CardLevel.Level(1).label)

    def test_creation_duplicates(self):
        CardLevel.objects.create(level=1)

        self.assertRaises(IntegrityError, CardLevel.objects.create, level=1)
