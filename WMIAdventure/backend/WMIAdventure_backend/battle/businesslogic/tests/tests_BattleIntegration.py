from unittest import TestCase

from IngameUsers.models import UserProfile, UserCard
from battle.businesslogic.Battle import Battle
from battle.businesslogic.tests.Creator import Creator
from cards.models import CardInfo, CardLevel, Card, CardEffect, CardLevelEffects
from users.models import User
from IngameUsers.models import Deck as DeckModel


class BattleIntegrationTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.creator = Creator()

        cls.user_profile_model1, cls.user_profile_model2 = cls.creator.get_user_profile_models()

    def _setup_test_battle1(self):
        """
        Creates necessary data to perform test_battle1.
        Creates attacker and defender models with decks containing only cards dealing 10 dmg.
        """

        dmg_power = 10
        dmg_range = 0

        card_info = CardInfo.objects.create(name="asdjlasj", tooltip="asdasg x")
        card = Card.objects.create(info=card_info, level=CardLevel.objects.get(pk=1))
        card_effect = CardEffect.objects.get(id=CardEffect.EffectId.DMG)
        card.effects.create(card_effect=card_effect, target=CardLevelEffects.Target.OPPONENT,
                            power=dmg_power, range=dmg_range)

        user1 = User.objects.create(username="attacker", email="attacker@company.com")
        attacker_profile = UserProfile.objects.create(user=user1, displayedUsername="attacker")
        attacker_user_card = UserCard.objects.create(user_profile=attacker_profile, card=card)
        attacker_deck_model = DeckModel.objects.create(
            card1=attacker_user_card,
            card2=attacker_user_card,
            card3=attacker_user_card,
            card4=attacker_user_card,
            card5=attacker_user_card,
        )
        attacker_profile.user_decks.create(deck_number=1, deck=attacker_deck_model)

        user2 = User.objects.create(username="defender", email="defender@company.com")
        defender_profile = UserProfile.objects.create(user=user2, displayedUsername="defender")
        defender_user_card = UserCard.objects.create(user_profile=defender_profile, card=card)
        defender_deck_model = DeckModel.objects.create(
            card1=defender_user_card,
            card2=defender_user_card,
            card3=defender_user_card,
            card4=defender_user_card,
            card5=defender_user_card,
        )
        defender_profile.user_decks.create(deck_number=1, deck=defender_deck_model)

        return attacker_profile, defender_profile

    def test_battle1(self):
        """
        Scenario: Attacker and defender have decks containing only cards dealing 10 dmg.
        Expected result: attacker wins with 10 hp remaining.
        """

        attacker_model, defender_model = self._setup_test_battle1()

        battle = Battle(attacker_model, defender_model)
        battle.start()

        expected_winner = battle.attacker
        actual_winner = battle.outcome.get_winner()

        self.assertIs(actual_winner, expected_winner)

        expected_winner_hp = 10
        actual_winner_hp = actual_winner.statistics.hp

        self.assertEqual(actual_winner_hp, expected_winner_hp)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.creator.perform_deletion()
