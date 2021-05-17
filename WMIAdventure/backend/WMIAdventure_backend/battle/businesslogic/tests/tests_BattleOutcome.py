from django.test import TestCase

from .Creator import Creator
from ..BattleDeck import BattleDeck
from ..BattleOutcome import BattleOutcome
from ..BattlePlayer import BattlePlayer


class BattleOutcomeTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile_model1, cls.user_profile_model2 = \
            cls.creator.get_user_profile_models()

        cls.attacker_deck_model, cls.defender_deck_model = cls.creator.get_decks(1)

        cls.attacker = BattlePlayer(cls.user_profile_model1.user.id,
                                    BattleDeck(cls.attacker_deck_model))

        cls.defender = BattlePlayer(cls.user_profile_model2.user.id,
                                    BattleDeck(cls.defender_deck_model))

    def setUp(self) -> None:
        self.outcome = BattleOutcome(self.attacker, self.defender)

    def test_creation(self):
        expected_attacker = self.attacker
        expected_defender = self.defender

        self.assertFalse(self.outcome.is_completed)
        self.assertIs(self.outcome.attacker, expected_attacker)
        self.assertIs(self.outcome.defender, expected_defender)

    def test_is_done_after_creation(self):
        self.assertFalse(self.outcome.is_done())

    def test_get_winner_after_creation(self):
        expected_outcome = None

        self.assertEqual(self.outcome.get_winner(), expected_outcome)

    def test_get_winner(self):
        self.outcome.defender.statistics.hp = 0.0
        self.outcome.is_done()
        self.assertIs(self.outcome.get_winner(), self.attacker)

        # Restoring to
        self.outcome.defender.statistics.hp = self.outcome.defender.statistics.MAX_HP

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
