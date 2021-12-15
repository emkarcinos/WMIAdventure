from unittest import TestCase

from battle.businesslogic.Deck import Deck
from battle.businesslogic.Player import Player
from battle.businesslogic.effects.StopPlayerEffect import StopPlayerEffect
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardLevelEffects, CardEffect


class StopPlayerEffectTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.creator = Creator()

        cls.u1, cls.u2 = cls.creator.get_user_models()
        cls.d1, cls.d2 = cls.creator.get_decks()

        cls.card_effect_info_model = CardEffect.objects.get(id=CardEffect.EffectId.STOP)

        cls.target = CardLevelEffects.Target.OPPONENT

        cls.effect_model = CardLevelEffects.objects.create(
            card=cls.creator.get_cards()[0],
            card_effect=cls.card_effect_info_model,
            target=cls.target,
            power=5.0,
            range=1.0
        )

    def setUp(self) -> None:
        self.card_owner = Player(self.u1.id, Deck(self.d1), 1)
        self.other_player = Player(self.u2.id, Deck(self.d2), 1)
        self.target = self.other_player

        self.turns_stopped = 5
        self.stop_player_effect = StopPlayerEffect(self.effect_model, self.turns_stopped)

    def test_stopping_player(self):
        self.stop_player_effect.activate(self.card_owner, self.other_player, None)

        expected_turns_stopped = self.turns_stopped
        actual_turns_stopped = self.target.turns_stopped

        self.assertEqual(actual_turns_stopped, expected_turns_stopped)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
