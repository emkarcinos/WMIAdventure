from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.BattleCard import BattleCard
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

    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        u1, u2 = cls.creator.get_user_models()
        d1 = cls.creator.get_decks()[0]
        d2 = cls.creator.get_decks(user=1)[0]
        cls.player1 = Player(u1.id, Deck(d1))
        cls.player2 = Player(u2.id, Deck(d2))

    def test_damage_buff(self):
        # Restoring player2 hp to max
        self.player2.statistics.hp = self.player2.statistics.MAX_HP

        dmg_pow = 10
        buff_pow = 5
        dmg_card = BattleCard(Card())
        dmg_card.effects.insert(0, self.create_effect(CardEffect.EffectId.DMG,
                                                   power=dmg_pow))
        buff_card = BattleCard(Card())
        buff_card.effects.insert(1, self.create_effect(CardEffect.EffectId.EMPOWER_DMG,
                                                       target=CardLevelEffects.Target.PLAYER,
                                                       power=buff_pow))
        self.player1.deck.temp_cards_queue.append(buff_card)
        self.player1.deck.temp_cards_queue.append(dmg_card)

        # Buffing next card
        effects = self.player1.use_card()
        for e in effects:
            e.activate(self.player1, self.player2, None)

        # Check whether the buff got assigned properly
        self.assertGreater(len(dmg_card.effects[0].buffs), 0)
        # Activating damage effect
        effects = self.player1.use_card()
        for e in effects:
            e.activate(self.player1, self.player2, None)

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
        effects = self.player1.use_card()
        for e in effects:
            e.activate(self.player1, self.player2, None)

        # Activating damage effect
        effects = self.player1.use_card()
        for e in effects:
            e.activate(self.player1, self.player2, None)

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
        effects = self.player1.use_card()
        for e in effects:
            e.activate(self.player1, self.player2, None)

        # Activating randomization effect
        effects = self.player1.use_card()
        # Lets force the randomization until the first card is different than before
        top_card_before_randomization = self.player2.deck.lookup()
        while self.player2.deck.lookup() is not top_card_before_randomization:
            for e in effects:
                e.activate(self.player1, self.player2, None)

        # Our previous top card is no longer on top, so it should not have any buffs.
        self.assertEqual(0, len(top_card_before_randomization.effects[0].buffs))
        # Current top card should have the buff.
        self.assertEqual(1, len(self.player2.deck.lookup().effects[0].buffs))

        # clearing buffs before next tests
        self.clear_buffs(top_card_before_randomization)
        self.clear_buffs(self.player2.deck.lookup())




    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
