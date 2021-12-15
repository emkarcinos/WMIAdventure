from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.BlockCardEffect import BlockCardEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardLevelEffects, CardEffect


class BlockCardEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1, cls.u2 = cls.creator.get_user_models()
        cls.d1, cls.d2 = cls.creator.get_decks()

        cls.card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.BLOCK)

        cls.target_enum = CardLevelEffects.Target.OPPONENT

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=cls.card_effect_info_model,
            target=cls.target_enum,
            power=5.0,
            range=1.0
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1), 1)
        self.other_player = Player(self.u2.id, Deck(self.d2), 1)

        self.target = self.other_player
        self.blocked_card = self.target.deck.lookup()

        self.other_player.statistics.armour = 0

        self.how_many_turns_blocked = 5
        self.block_card_effect = BlockCardEffect(self.effect_model, self.how_many_turns_blocked)

    def test_block_next_card(self):
        self.block_card_effect.activate(self.card_owner, self.other_player, None)

        expected_effects = []
        _, actual_effects = self.target.use_card()

        expected_turns_blocked = self.how_many_turns_blocked - 1
        actual_turns_blocked = self.blocked_card.turns_blocked

        self.assertEqual(actual_turns_blocked, expected_turns_blocked)
        self.assertEqual(actual_effects, expected_effects)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
