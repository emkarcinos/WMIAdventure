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

    def _setup_test_battle2(self):
        """
        Creates necessary data to perform test_battle2.
        Attacker deck:
            1. DMG 30
            2. HEAL 30
            3. DMG 20
            4. DMG 50
            5. DMG 20

        Defender deck:
            1. DMG 40
            2. SHIELD 20
            3. STOP | DMG 40
            4. DMG 50 | SHIELD 20
            5. HEAL 30
        """

        # Attacker Card 1: DMG 30
        attacker_user_card1 = self.creator.create_user_card(self.attacker_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "a1", 30, 0)
        # Attacker Card 2: HEAL 30
        attacker_user_card2 = self.creator.create_user_card(self.attacker_profile, CardEffect.EffectId.HEAL,
                                                            CardLevelEffects.Target.PLAYER, "a2", 30, 0)
        # Attacker Card 3: DMG 20
        attacker_user_card3 = self.creator.create_user_card(self.attacker_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "a3", 20, 0)
        # Attacker Card 4: DMG 50
        attacker_user_card4 = self.creator.create_user_card(self.attacker_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "a4", 50, 0)
        # Attacker Card 5: DMG 20
        attacker_user_card5 = self.creator.create_user_card(self.attacker_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "a5", 20, 0)
        # Attacker Deck
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card1, attacker_user_card2,
                                      attacker_user_card3, attacker_user_card4, attacker_user_card5)

        # Defender Card 1: DMG 40
        defender_user_card1 = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "d1", 40, 0)
        # Defender Card 2: SHIELD 20
        defender_user_card2 = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.SHIELD,
                                                            CardLevelEffects.Target.PLAYER, "d2", 20, 0)
        # Defender Card 3: STOP | DMG 40
        defender_user_card3 = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.STOP,
                                                            CardLevelEffects.Target.OPPONENT, "d3")
        card_model = defender_user_card3.card
        card_model.effects.create(card_effect=CardEffect.objects.get(pk=CardEffect.EffectId.DMG),
                                  target=CardLevelEffects.Target.OPPONENT, power=40, range=0.0)
        # Defender Card 4: DMG 50 | SHIELD 20
        defender_user_card4 = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.DMG,
                                                            CardLevelEffects.Target.OPPONENT, "d4", 50, 0)
        card_model = defender_user_card4.card
        card_model.effects.create(card_effect=CardEffect.objects.get(pk=CardEffect.EffectId.SHIELD),
                                  target=CardLevelEffects.Target.PLAYER, power=20, range=0.0)
        # Defender Card 5: HEAL 30
        defender_user_card5 = self.creator.create_user_card(self.defender_profile, CardEffect.EffectId.HEAL,
                                                            CardLevelEffects.Target.PLAYER, "d5", 30, 0)
        # Defender Deck
        self.creator.create_user_deck(self.defender_profile, defender_user_card1, defender_user_card2,
                                      defender_user_card3, defender_user_card4, defender_user_card5)

    def test_battle2(self):
        """
        Scenario:
            Attacker deck:
                1. DMG 30
                2. HEAL 30
                3. DMG 20
                4. DMG 50
                5. DMG 20

            Defender deck:
                1. DMG 40
                2. SHIELD 20
                3. STOP | DMG 40
                4. DMG 50 | SHIELD 20
                5. HEAL 30

            Turns:

                1. Turn: Attacker - Card 1
                    Attacker: hp = 100; shield = 0

                    Defender: hp = 70; shield = 0

                2. Turn: Defender - Card 1
                    Attacker: hp = 60; shield = 0

                    Defender: hp = 70; shield = 0

                3. Turn: Attacker - Card 2
                    Attacker: hp = 90; shield = 0

                    Defender: hp = 70; shield = 0

                4. Turn: Defender - Card 2
                    Attacker: hp = 90; shield = 0

                    Defender: hp = 70; shield = 20

                5. Turn: Attacker - Card 3
                    Attacker: hp = 90; shield = 0

                    Defender: hp = 70; shield = 0

                6. Turn: Defender - Card 3
                    Attacker: hp = 50; shield = 0

                    Defender: hp = 70; shield = 0

                7. Turn: Defender - Card 4
                    Attacker: hp = 0; shield = 0

                    Defender: hp = 70; shield = 20

        Expected result: defender wins with 70 hp and 20 shield remaining.
        """

        self._setup_test_battle2()

        battle = Battle(self.attacker_profile, self.defender_profile)
        battle.start()

        expected_winner = battle.defender
        actual_winner = battle.outcome.get_winner()

        self.assertIs(actual_winner, expected_winner)

        expected_winner_hp = 70
        actual_winner_hp = actual_winner.statistics.hp

        self.assertEqual(actual_winner_hp, expected_winner_hp)

        expected_winner_shield = 20
        actual_winner_shield = actual_winner.statistics.armour

        self.assertEqual(actual_winner_shield, expected_winner_shield)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()
