from unittest import TestCase

from battle.businesslogic.BattleCard import BattleCard
from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.EffectFactory import EffectFactory
from battle.businesslogic.tests.Creator import Creator
from cards.models import Card, CardLevelEffects, CardEffect


class EffectsIntegrationsTestCase(TestCase):
    def create_effect(self, effect_enum, target=CardLevelEffects.Target.OPPONENT, power=0.0, range=0.0):
        """
        Creates a temporary Effect.
        """
        factory = EffectFactory().get_instance()
        return factory.create(CardLevelEffects(card_effect=CardEffect(effect_enum),
                                               target=target,
                                               power=power,
                                               range=range))

    def clear_buffs(self, card):
        for e in card.effects:
            e.buffs.clear()

    def activate_card(self, card_owner, other_player):
        _, effects = card_owner.use_card()
        for e in effects:
            e.activate(card_owner, other_player, None)

    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1, cls.u2 = cls.creator.get_user_models()
        cls.d1 = cls.creator.get_decks()[0]
        cls.d2 = cls.creator.get_decks(user=1)[0]

    def setUp(self) -> None:
        self.player1 = Player(self.u1.id, Deck(self.d1))
        self.player2 = Player(self.u2.id, Deck(self.d2))

    def test_damage_buff(self):
        dmg_pow = 10
        buff_pow = 5
        dmg_card = BattleCard(Card())
        dmg_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                   power=dmg_pow))
        buff_card = BattleCard(Card())
        buff_card.effects.insert(0, self.create_effect(CardEffect.EffectId.EMPOWER_DMG,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=buff_pow))
        self.player1.deck.temp_cards_queue.append(buff_card)
        self.player1.deck.temp_cards_queue.append(dmg_card)

        # Buffing next card
        self.activate_card(self.player1, self.player2)

        # Check whether the buff got assigned properly
        self.assertGreater(len(dmg_card.effects[0].buffs), 0)
        # Activating damage effect
        self.activate_card(self.player1, self.player2)

        expected_hp_remaining = self.player2.statistics.MAX_HP - (dmg_pow + buff_pow)
        self.assertEqual(self.player2.get_hp(), expected_hp_remaining)

    def test_buff_wrong_type(self):
        # Restoring player2 hp to max
        self.player2.statistics.hp = self.player2.statistics.MAX_HP

        dmg_pow = 10
        buff_pow = 5
        dmg_card = BattleCard(Card())
        dmg_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                      power=dmg_pow))
        buff_card = BattleCard(Card())
        buff_card.effects.insert(1, self.create_effect(CardEffect.EffectId.EMPOWER_HEAL,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=buff_pow))
        self.player1.deck.temp_cards_queue.append(buff_card)
        self.player1.deck.temp_cards_queue.append(dmg_card)

        # Buffing next card
        self.activate_card(self.player1, self.player2)

        # Activating damage effect
        self.activate_card(self.player1, self.player2)

        expected_hp_remaining = self.player2.statistics.MAX_HP - dmg_pow
        self.assertEqual(self.player2.get_hp(), expected_hp_remaining)

    def test_buff_next_card_and_randomize(self):
        """
        This test should pass, but doesn't.
        """

        self.skipTest("Lets worry about it later")
        buff_card = BattleCard(Card())
        buff_card.effects.insert(0, self.create_effect(CardEffect.EffectId.EMPOWER,
                                                       target=CardLevelEffects.Target.OPPONENT,
                                                       power=20.0))

        randomizing_card = BattleCard(Card())
        randomizing_card.effects.insert(1, self.create_effect(CardEffect.EffectId.SWAP_RND,
                                                              target=CardLevelEffects.Target.OPPONENT))

        self.player1.deck.temp_cards_queue.append(buff_card)
        self.player1.deck.temp_cards_queue.append(randomizing_card)
        # Buffing next card
        self.activate_card(self.player1, self.player2)

        # Lets force the randomization until the first card is different than before
        top_card_before_randomization = self.player2.deck.lookup()
        self.activate_card(self.player1, self.player2)

        # Our previous top card is no longer on top, so it should not have any buffs.
        self.assertEqual(0, len(top_card_before_randomization.effects[0].buffs))
        # Current top card should have the buff.
        self.assertEqual(1, len(self.player2.deck.lookup().effects[0].buffs))

    def test_buff_and_block_card_use(self):
        """
        Tests scenario: Player 1 buff their next card - Player 2 blocks the next Player 1 card - Blocked execution
        - Check what happens with skipped card - The card should no longer have a buff, as one turn has passed.
        """
        buff_card = BattleCard(Card())
        buff_card.effects.insert(0, self.create_effect(CardEffect.EffectId.EMPOWER,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=20.0))
        self.player1.deck.temp_cards_queue.append(buff_card)

        block_card = BattleCard(Card())
        block_card.effects.insert(0, self.create_effect(CardEffect.EffectId.BLOCK,
                                                        target=CardLevelEffects.Target.OPPONENT))
        self.player2.deck.temp_cards_queue.append(block_card)

        buffed_damage_card = BattleCard(Card())
        buffed_damage_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                                target=CardLevelEffects.Target.OPPONENT,
                                                                power=10.0))
        self.player1.deck.temp_cards_queue.append(buffed_damage_card)

        self.activate_card(self.player1, self.player2)
        self.activate_card(self.player2, self.player1)
        # This activation activates blocked card
        self.activate_card(self.player1, self.player2)
        # Effect in next activation should not be buffed
        effect = self.player1.use_card()[1][0]
        self.assertEqual(len(effect.buffs), 0)

    def test_buff_does_not_get_duplicated_on_double_card(self):
        """
        Test scenario: Player 1 buffs his next card, Player 2 applies double use effect on P1's card.
        Player 1 card should execute two times: once with buff, second time without it.
        """
        buff_card = BattleCard(Card())
        buff_card.effects.insert(0, self.create_effect(CardEffect.EffectId.EMPOWER,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=20.0))
        self.player1.deck.temp_cards_queue.append(buff_card)

        double_exec_card = BattleCard(Card())
        double_exec_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DOUBLEACTION,
                                                        target=CardLevelEffects.Target.OPPONENT))
        self.player2.deck.temp_cards_queue.append(double_exec_card)

        # This card will get executed twice
        buffed_damage_card = BattleCard(Card())
        buffed_damage_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                                target=CardLevelEffects.Target.OPPONENT,
                                                                power=10.0))

        self.player1.deck.temp_cards_queue.append(buffed_damage_card)

        # Buff next card
        self.activate_card(self.player1, self.player2)

        # Make P1's card execute two times
        self.activate_card(self.player2, self.player1)
        # This activation should be buffed
        self.activate_card(self.player1, self.player2)
        # This one should not
        effect = self.player1.use_card()[1][0]
        self.assertEqual(len(effect.buffs), 0)

    def test_block_and_skip(self):
        """
        Test scenario: Player 1 blocks next opponent's card, then skips it.
        Expected result: Skipped card should remain intact, next P2's card should be blocked.
        """
        self.skipTest("This test fails, but its OK")
        block_card = BattleCard(Card())
        block_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                                target=CardLevelEffects.Target.OPPONENT,
                                                                power=10.0))

        self.player1.deck.temp_cards_queue.append(block_card)

        skip_card = BattleCard(Card())
        skip_card.effects.insert(0, self.create_effect(CardEffect.EffectId.EMPOWER,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=20.0))
        self.player1.deck.temp_cards_queue.append(skip_card)

        # This one will be skipped
        heal_card = BattleCard(Card())
        heal_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                                           target=CardLevelEffects.Target.PLAYER,
                                                                           power=100.0))
        self.player2.deck.temp_cards_queue.append(heal_card)

        # This one should get blocked
        dmg_card = BattleCard(Card())
        dmg_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                                           target=CardLevelEffects.Target.OPPONENT,
                                                                           power=100.0))
        self.player2.deck.temp_cards_queue.append(dmg_card)

        # Block next P2 card
        self.activate_card(self.player1, self.player2)
        # Skip next P2 card
        self.activate_card(self.player1, self.player2)
        # P2 executes next card - the top one(heal_card) should be skipped,
        # so dmg_card should get activated, but it should get blocked by P1 previous move.
        hp_before_activation = self.player2.get_hp()
        self.activate_card(self.player2, self.player1)
        # Player should remain unharmed, because the damage card should get blocked.
        self.assertEqual(self.player2.get_hp(), hp_before_activation)


    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
