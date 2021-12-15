from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.RandomizeDeckEffect import RandomizeDeckEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardLevelEffects, CardEffect


class RandomizeDeckEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1, cls.u2 = cls.creator.get_user_models()
        cls.d1, cls.d2 = cls.creator.get_decks()

        cls.card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.SWAP_RND)

        cls.target = CardLevelEffects.Target.OPPONENT

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=cls.card_effect_info_model,
            target=cls.target,
            power=None,
            range=None
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1), 1)
        self.other_player = Player(self.u2.id, Deck(self.d2), 1)

        self.target = self.other_player

        self.randomize_deck_effect = RandomizeDeckEffect(self.effect_model)

    def test_randomize_deck(self):
        deck = self.target.deck

        original_deck_order = [card.card_model.id for card in list(deck.cards_queue)]

        self.randomize_deck_effect.activate(self.card_owner, self.other_player, None)
        new_deck_order = [card.card_model.id for card in list(deck.cards_queue)]

        self.assertNotEqual(new_deck_order, original_deck_order)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
