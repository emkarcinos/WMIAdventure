from django.test import TestCase

from IngameUsers.models import UserProfile
from battle.businesslogic.Battle import Battle
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects
from users.models import User


class BattleIntegrationTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super(BattleIntegrationTestCase, cls).setUpClass()

        cls.creator = Creator()

        cls.user1 = User.objects.create(username="attacker", email="attacker@company.com")
        cls.user2 = User.objects.create(username="defender", email="defender@company.com")

        cls.attacker_profile = UserProfile.objects.create(user=cls.user1, displayedUsername="attacker")
        cls.defender_profile = UserProfile.objects.create(user=cls.user2, displayedUsername="defender")

    def _setup_test_battle1(self):
        """
        Creates necessary data to perform test_battle1.
        Creates attacker and defender models with decks containing only cards dealing 10 dmg.
        """

        attacker_user_card = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.DMG,
                                                           CardLevelEffects.Target.OPPONENT, "a1", 10, 0)
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card, attacker_user_card,
                                      attacker_user_card, attacker_user_card, attacker_user_card)

        defender_user_card = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.DMG,
                                                           CardLevelEffects.Target.OPPONENT, "d1", 10, 0)
        self.creator.create_user_deck(self.defender_profile, defender_user_card, defender_user_card,
                                      defender_user_card, defender_user_card, defender_user_card)

    def tearDown(self) -> None:
        pass

    def test_battle1(self):
        """
        Scenario: Attacker and defender have decks containing only cards dealing 10 dmg.
        Expected result: attacker wins with 10 hp remaining.
        """

        self._setup_test_battle1()

        battle = Battle(self.attacker_profile, self.defender_profile)
        battle.start()

        expected_winner = battle.attacker
        actual_winner = battle.outcome.get_winner()

        self.assertIs(actual_winner, expected_winner)

        expected_winner_hp = 10
        actual_winner_hp = actual_winner.statistics.hp

        self.assertEqual(actual_winner_hp, expected_winner_hp)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
