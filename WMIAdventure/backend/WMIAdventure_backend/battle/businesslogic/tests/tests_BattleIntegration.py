from django.test import TestCase

from IngameUsers.factories import UserProfileFactory
from battle.businesslogic.Battle import Battle
from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardEffect, CardLevelEffects


class BattleIntegrationTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super(BattleIntegrationTestCase, cls).setUpClass()

        cls.creator = Creator()

        cls.attacker_profile = UserProfileFactory()
        cls.defender_profile = UserProfileFactory()

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

    def test_battle3(self):
        """
        Scenario:
            Attacker deck:
                1. Empower next card: modifier +50
                2. DMG 50 | SHIELD 10 | HEAL 50
                3. DMG 1
                4. DMG 1
                5. DMG 1

            Defender deck:
                1. DMG 99
                2. HEAL 100
                3. DMG 99
                4. DMG 99
                5. DMG 99

            Turns:

                1. Turn: Attacker - Card 1
                    Attacker: hp = 100; shield = 0

                    Defender: hp = 100; shield = 0

                2. Turn: Defender - Card 1
                    Attacker: hp = 1; shield = 0

                    Defender: hp = 100; shield = 0

                3. Turn: Attacker - Card 2
                    Attacker: hp = 100; shield = 20

                    Defender: hp = 0; shield = 0

        Expected result: Attacker wins with 100 hp and 20 shield remaining.
        """

        self._setup_test_battle3()

        battle = Battle(self.attacker_profile, self.defender_profile)
        battle.start()

        expected_winner = battle.attacker
        actual_winner = battle.outcome.get_winner()

        self.assertIs(actual_winner, expected_winner)

        expected_winner_hp = 100
        actual_winner_hp = actual_winner.statistics.hp

        self.assertEqual(actual_winner_hp, expected_winner_hp)

        expected_winner_shield = 20
        actual_winner_shield = actual_winner.statistics.armour

        self.assertEqual(actual_winner_shield, expected_winner_shield)

    def test_battle4(self):
        """
        Scenario:
            Attacker deck:
                1. BLOCK -> OPPONENT | DEAL 20 DMG -> PLAYER
                2. SKIP CARD -> OPPONENT | DMG 35 -> OPPONENT
                3. TWO TIMES EXECUTE -> PLAYER
                4. DMG 50 -> OPPONENT
                5. TRUE DMG 20 -> OPPONENT

            Defender deck:
                1. TRUE DMG 100 -> OPPONENT
                2. HEAL 35 -> PLAYER
                3. DMG 40 -> OPPONENT
                4. SHIELD 20 -> PLAYER
                5. DMG 20 -> OPPONENT | HEAL 15 -> PLAYER

            Turns:

                1. Turn: Attacker - Card 1
                    Attacker: hp = 80; shield = 0

                    Defender: hp = 100; shield = 0

                2. Turn: Defender - Card 1 (BLOCKED CARD)
                    Attacker: hp = 80; shield = 0

                    Defender: hp = 100; shield = 0

                3. Turn: Attacker - Card 2
                    Attacker: hp = 80; shield = 0

                    Defender: hp = 65; shield = 0

                4. Turn: Defender - Card 3 (3, because card 2 was skipped)
                    Attacker: hp = 40; shield = 0

                    Defender: hp = 65; shield = 0

                5. Turn: Attacker - Card 3
                    Attacker: hp = 40; shield = 0

                    Defender: hp = 65; shield = 0

                6. Turn: Defender - Card 4
                    Attacker: hp = 40; shield = 0

                    Defender: hp = 65; shield = 20

                7. Turn: Attacker - Card 4
                    Attacker: hp = 40; shield = 0

                    Defender: hp = 35; shield = 0

                8. Turn: Defender - Card 5
                    Attacker: hp = 20; shield = 0

                    Defender: hp = 50; shield = 0

                9. Turn: Attacker - Card 4 (4, because there was TwoTimesExecute effect)
                    Attacker: hp = 20; shield = 0

                    Defender: hp = 0; shield = 0

        Expected result: Attacker wins with 20 hp and 0 shield remaining.
            Card at the front of attacker's cards queue: 5. TRUE DMG 20 -> OPPONENT
        
            Card at the front of defender's cards queue: 2. TRUE DMG 100 -> OPPONENT
        """

        self._setup_test_battle4()

        battle = Battle(self.attacker_profile, self.defender_profile)
        battle.start()

        expected_winner = battle.attacker
        actual_winner = battle.outcome.get_winner()

        self.assertIs(actual_winner, expected_winner)

        expected_winner_hp = 20
        actual_winner_hp = actual_winner.statistics.hp

        self.assertEqual(actual_winner_hp, expected_winner_hp)

        expected_winner_shield = 0
        actual_winner_shield = actual_winner.statistics.armour

        self.assertEqual(actual_winner_shield, expected_winner_shield)

        # Assert at the front of attacker's cards queue is card: 5. TRUE DMG 20 -> OPPONENT

        attacker_front_card: BattleCard = battle.attacker.deck.lookup()
        self.assertEqual(len(attacker_front_card.effects), 1)

        expected_effect_id = CardEffect.EffectId.TRUE_DMG
        actual_effect_id = attacker_front_card.effects[0].effect_model.card_effect.id
        self.assertEqual(actual_effect_id, expected_effect_id)

        expected_effect_power = 20
        actual_effect_power = attacker_front_card.effects[0].power
        self.assertEqual(actual_effect_power, expected_effect_power)

        expected_effect_range = 0.0
        actual_effect_range = attacker_front_card.effects[0].range
        self.assertEqual(actual_effect_range, expected_effect_range)

        # Assert at the front of defender's cards queue is card: 2. TRUE DMG 100 -> OPPONENT

        defender_front_card: BattleCard = battle.defender.deck.lookup()
        self.assertEqual(len(defender_front_card.effects), 1)

        expected_effect_id = CardEffect.EffectId.TRUE_DMG
        actual_effect_id = defender_front_card.effects[0].effect_model.card_effect.id
        self.assertEqual(actual_effect_id, expected_effect_id)

        expected_effect_power = 100
        actual_effect_power = defender_front_card.effects[0].power
        self.assertEqual(actual_effect_power, expected_effect_power)

        expected_effect_range = 0.0
        actual_effect_range = defender_front_card.effects[0].range
        self.assertEqual(actual_effect_range, expected_effect_range)

    def _setup_test_battle4(self):
        """
        Creates necessary data to perform test_battle4.
        Attacker deck:
            1. BLOCK -> OPPONENT | DEAL 20 DMG -> PLAYER
            2. SKIP CARD -> OPPONENT | DMG 35 -> OPPONENT
            3. TWO TIMES EXECUTE -> PLAYER
            4. DMG 50 -> OPPONENT
            5. TRUE DMG 20 -> OPPONENT

        Defender deck:
            1. TRUE DMG 100 -> OPPONENT
            2. HEAL 35 -> PLAYER
            3. DMG 40 -> OPPONENT
            4. SHIELD 20 -> PLAYER
            5. DMG 20 -> OPPONENT | HEAL 15 -> PLAYER
        """

        # Attacker Card 1: BLOCK -> OPPONENT | DEAL 20 DMG -> PLAYER
        effects_data = [
            (CardEffect.EffectId.BLOCK, CardLevelEffects.Target.OPPONENT, None, None),
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.PLAYER, 20, 0),
        ]
        attacker_user_card1 = self.creator.create_user_card(self.attacker_profile, effects_data, "a1")

        # Attacker Card 2: SKIP CARD -> OPPONENT | DMG 35 -> OPPONENT
        effects_data = [
            (CardEffect.EffectId.SKIP, CardLevelEffects.Target.OPPONENT, None, None),
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 35, 0)
        ]
        attacker_user_card2 = self.creator.create_user_card(self.attacker_profile, effects_data, "a2")

        # Attacker Card 3: TWO TIMES EXECUTE -> PLAYER
        effects_data = [(CardEffect.EffectId.DOUBLEACTION, CardLevelEffects.Target.PLAYER, None, None)]
        attacker_user_card3 = self.creator.create_user_card(self.attacker_profile, effects_data, "a3")

        # Attacker Card 4: DMG 50 -> OPPONENT
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 50, 0)]
        attacker_user_card4 = self.creator.create_user_card(self.attacker_profile, effects_data, "a4")

        # Attacker Card 5: TRUE DMG 20 -> OPPONENT
        effects_data = [(CardEffect.EffectId.TRUE_DMG, CardLevelEffects.Target.OPPONENT, 20, 0)]
        attacker_user_card5 = self.creator.create_user_card(self.attacker_profile, effects_data, "a5")

        # Attacker Deck
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card1, attacker_user_card2,
                                      attacker_user_card3, attacker_user_card4, attacker_user_card5)

        # Defender Card 1: TRUE DMG 100 -> OPPONENT
        effects_data = [(CardEffect.EffectId.TRUE_DMG, CardLevelEffects.Target.OPPONENT, 100, 0)]
        defender_user_card1 = self.creator.create_user_card(self.defender_profile, effects_data, "d1")

        # Defender Card 2: HEAL 35 -> PLAYER
        effects_data = [(CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 35, 0)]
        defender_user_card2 = self.creator.create_user_card(self.defender_profile, effects_data, "d2")

        # Defender Card 3: DMG 40 -> OPPONENT
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 40, 0)]
        defender_user_card3 = self.creator.create_user_card(self.defender_profile, effects_data, "d3")

        # Defender Card 4: SHIELD 20 -> PLAYER
        effects_data = [(CardEffect.EffectId.SHIELD, CardLevelEffects.Target.PLAYER, 20, 0)]
        defender_user_card4 = self.creator.create_user_card(self.defender_profile, effects_data, "d4")

        # Defender Card 5: DMG 20 -> OPPONENT | HEAL 15 -> PLAYER
        effects_data = [
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 20, 0),
            (CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 15, 0)
        ]
        defender_user_card5 = self.creator.create_user_card(self.defender_profile, effects_data, "d5")

        # Defender Deck
        self.creator.create_user_deck(self.defender_profile, defender_user_card1, defender_user_card2,
                                      defender_user_card3, defender_user_card4, defender_user_card5)

    def _setup_test_battle3(self):
        """
        Creates necessary data to perform test_battle3.
        Attacker deck:
            1. Empower next card: modifier +50
            2. DMG 50 | SHIELD 10 | HEAL 50
            3. DMG 1
            4. DMG 1
            5. DMG 1

        Defender deck:
            1. DMG 99
            2. HEAL 100
            3. DMG 99
            4. DMG 99
            5. DMG 99
        """

        # Attacker Card 1: Empower next card: modifier +50
        effects_data = [(CardEffect.EffectId.EMPOWER, CardLevelEffects.Target.PLAYER, 50, 0)]
        attacker_user_card1 = self.creator.create_user_card(self.attacker_profile, effects_data, "a1")

        # Attacker Card 2: DMG 50 | SHIELD 10 | HEAL 50
        effects_data = [
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 50, 0),
            (CardEffect.EffectId.SHIELD, CardLevelEffects.Target.PLAYER, 10, 0),
            (CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 50, 0)
        ]
        attacker_user_card2 = self.creator.create_user_card(self.attacker_profile, effects_data, "a2")

        # Attacker Card 3, 4, 5: DMG 1
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 1, 0)]
        attacker_user_card345 = self.creator.create_user_card(self.attacker_profile, effects_data, "a345")

        # Attacker Deck
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card1, attacker_user_card2,
                                      attacker_user_card345, attacker_user_card345, attacker_user_card345)

        # Defender Card 1, 3, 4, 5: DMG 99
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 99, 0)]
        defender_user_card1345 = self.creator.create_user_card(self.defender_profile, effects_data, "d1345")

        # Defender Card 2: HEAL 100
        effects_data = [(CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 100, 0)]
        defender_user_card2 = self.creator.create_user_card(self.defender_profile, effects_data, "d2")

        # Defender Deck
        self.creator.create_user_deck(self.defender_profile, defender_user_card1345, defender_user_card2,
                                      defender_user_card1345, defender_user_card1345, defender_user_card1345)

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
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 30, 0)]
        attacker_user_card1 = self.creator.create_user_card(self.attacker_profile, effects_data, "a1")

        # Attacker Card 2: HEAL 30
        effects_data = [(CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 30, 0)]
        attacker_user_card2 = self.creator.create_user_card(self.attacker_profile, effects_data, "a2")

        # Attacker Card 3: DMG 20
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 20, 0)]
        attacker_user_card3 = self.creator.create_user_card(self.attacker_profile, effects_data, "a3")

        # Attacker Card 4: DMG 50
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 50, 0)]
        attacker_user_card4 = self.creator.create_user_card(self.attacker_profile, effects_data, "a4")

        # Attacker Card 5: DMG 20
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 20, 0)]
        attacker_user_card5 = self.creator.create_user_card(self.attacker_profile, effects_data, "a5")

        # Attacker Deck
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card1, attacker_user_card2,
                                      attacker_user_card3, attacker_user_card4, attacker_user_card5)

        # Defender Card 1: DMG 40
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 40, 0)]
        defender_user_card1 = self.creator.create_user_card(self.defender_profile, effects_data, "d1")

        # Defender Card 2: SHIELD 20
        effects_data = [(CardEffect.EffectId.SHIELD, CardLevelEffects.Target.PLAYER, 20, 0)]
        defender_user_card2 = self.creator.create_user_card(self.defender_profile, effects_data, "d2")

        # Defender Card 3: STOP | DMG 40
        effects_data = [
            (CardEffect.EffectId.STOP, CardLevelEffects.Target.OPPONENT, None, None),
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 40, 0)
        ]
        defender_user_card3 = self.creator.create_user_card(self.defender_profile, effects_data, "d3")

        # Defender Card 4: DMG 50 | SHIELD 20
        effects_data = [
            (CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 50, 0),
            (CardEffect.EffectId.SHIELD, CardLevelEffects.Target.PLAYER, 20, 0)
        ]
        defender_user_card4 = self.creator.create_user_card(self.defender_profile, effects_data, "d4")

        # Defender Card 5: HEAL 30
        effects_data = [(CardEffect.EffectId.HEAL, CardLevelEffects.Target.PLAYER, 30, 0)]
        defender_user_card5 = self.creator.create_user_card(self.defender_profile, effects_data, "d5")

        # Defender Deck
        self.creator.create_user_deck(self.defender_profile, defender_user_card1, defender_user_card2,
                                      defender_user_card3, defender_user_card4, defender_user_card5)

    def _setup_test_battle1(self):
        """
        Creates necessary data to perform test_battle1.
        Creates attacker and defender models with decks containing only cards dealing 10 dmg.
        """

        # Attacker
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 10, 0)]
        attacker_user_card = self.creator.create_user_card(self.defender_profile, effects_data, "a1")
        self.creator.create_user_deck(self.attacker_profile, attacker_user_card, attacker_user_card,
                                      attacker_user_card, attacker_user_card, attacker_user_card)

        # Defender
        effects_data = [(CardEffect.EffectId.DMG, CardLevelEffects.Target.OPPONENT, 10, 0)]
        defender_user_card = self.creator.create_user_card(self.defender_profile, effects_data, "d1")
        self.creator.create_user_deck(self.defender_profile, defender_user_card, defender_user_card,
                                      defender_user_card, defender_user_card, defender_user_card)

    @classmethod
    def tearDownClass(cls):
        cls.creator.perform_deletion()

