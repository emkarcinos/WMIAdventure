from django.test import TestCase

from IngameUsers.businesslogic.exceptions import CannotUpgradeCardException
from IngameUsers.businesslogic.upgrading_cards import upgrade_card
from IngameUsers.factories import UserProfileFactory
from cards.factories import CardInfoFactory, CardFactory
from cards.models import CardLevel, Card


class UpgradingCardsTestCase(TestCase):
    def setUp(self) -> None:
        # Create card with all possible levels
        card_info = CardInfoFactory()
        self.card_levels: list[Card] = [
            CardFactory(info=card_info, level=level) for level in CardLevel.objects.order_by('level')
        ]

        # Last level shouldn't have next level cost
        self.card_levels[-1].next_level_cost = None
        self.card_levels[-1].save()

        # Create user profile with enough skill points to upgrade to maximum level
        self.user_profile = UserProfileFactory()
        user_stats = self.user_profile.user_stats
        for card_level in self.card_levels[:len(self.card_levels) - 1]:
            user_stats.skill_points += card_level.next_level_cost
        user_stats.save()

        # Give card with lowest level to user
        user_card = self.user_profile.user_cards.create(card=self.card_levels[0])

    def test_successful_upgrade(self):
        """
        **Scenario:**

        - User has card with level common. This card has gold and epic levels.

        - User has enough skill points to upgrade card to epic level.

        - So he does it by calling upgrade_card two times.

        ---

        **Expected result:**

        - Each time card is upgraded old UserCard object is deleted (user can own only one card level)

        - Each time user upgrades card he is owner of proper level and his skill points are subtracted correctly.
        """

        user_card = self.user_profile.user_cards.first()
        user_stats = self.user_profile.user_stats

        # Upgrade card to maximum level and assert everything goes as expected
        for expected_next_level in self.card_levels[1:]:
            previous_level = user_card.card
            expected_skill_points_after_upgrade = user_stats.skill_points - previous_level.next_level_cost

            user_card = upgrade_card(user_card)
            actual_next_level = user_card.card

            # Assert user is owner of correct card
            self.assertEqual(actual_next_level.id, expected_next_level.id)
            # Assert user is no longer owner of the previous level
            self.assertFalse(self.user_profile.user_cards.filter(card__level=previous_level.level.level).exists())

            # Assert user's skill points were subtracted properly
            user_stats.refresh_from_db()
            self.assertEqual(user_stats.skill_points, expected_skill_points_after_upgrade)

    def test_successful_upgrade2(self):
        """
        **Scenario:**

        - User has card with level common. This card has epic level too (but no gold level).

        - User has enough skill points to upgrade card to epic level.

        - So he does it by calling upgrade_card.

        ---

        **Expected result:**

        - When card is upgraded old UserCard object is deleted (user can own only one card level)

        - When user upgrades card he is owner of proper level and his skill points are subtracted correctly.
        """

        # Remove gold level so that there are only Common end Epic levels
        gold_level = self.card_levels[1]
        self.card_levels.remove(gold_level)
        gold_level.delete()

        # Retrieve user's card and stats
        user_card = self.user_profile.user_cards.first()
        user_stats = self.user_profile.user_stats

        # Upgrade card to maximum level and assert everything goes as expected
        for expected_next_level in self.card_levels[1:]:
            previous_level = user_card.card
            expected_skill_points_after_upgrade = user_stats.skill_points - previous_level.next_level_cost

            user_card = upgrade_card(user_card)
            actual_next_level = user_card.card

            # Assert user is owner of correct card
            self.assertEqual(actual_next_level.id, expected_next_level.id)
            # Assert user is no longer owner of the previous level
            self.assertFalse(self.user_profile.user_cards.filter(card__level=previous_level.level.level).exists())

            # Assert user's skill points were subtracted properly
            user_stats.refresh_from_db()
            self.assertEqual(user_stats.skill_points, expected_skill_points_after_upgrade)

    def test_user_has_not_enough_skill_points(self):
        """
        **Scenario:**

        - User has Card which has next level.

        - User wants to upgrade his card but he has not enough skill points to do it.

        ---

        **Expected result:**

        - CannotUpgradeCardException is raised, user's skill points are not changed and he still owns the same card.
        """

        user_card = self.user_profile.user_cards.first()
        user_stats = self.user_profile.user_stats

        owned_level = user_card.card

        # Make sure user has not enough skill points to upgrade card
        owned_level.next_level_cost = 10
        owned_level.save()

        user_stats.skill_points = owned_level.next_level_cost - 1
        user_stats.save()

        # Try to upgrade card
        skill_points_before = user_stats.skill_points
        self.assertRaises(CannotUpgradeCardException, upgrade_card, user_card=user_card)

        # Assert user still has the same amount of skill points
        user_stats.refresh_from_db()
        self.assertEqual(user_stats.skill_points, skill_points_before)

        # Assert user owns the same card
        self.assertEqual(self.user_profile.user_cards.count(), 1)
        currently_owned_level = self.user_profile.user_cards.first().card
        self.assertEqual(currently_owned_level.id, owned_level.id)

    def test_upgrade_card_is_on_max_level(self):
        """
        **Scenario:**

        - User has Card which is at maximum level.

        - User wants to upgrade this card.

        ---

        **Expected result:**

        - CannotUpgradeCardException is raised.
        """

        # Make sure user owns card with maximum level
        self.user_profile.user_cards.all().delete()
        owned_level = self.card_levels[-1]
        user_card = self.user_profile.user_cards.create(card=owned_level)

        # Try to upgrade card
        self.assertRaises(CannotUpgradeCardException, upgrade_card, user_card=user_card)

    def test_upgrade_card_with_no_next_level_cost(self):
        """
        **Scenario:**

        - User has Card which has many levels but no next_level_cost.

        - User wants to upgrade this card.

        ---

        **Expected result:**

        - CannotUpgradeCardException is raised.
        """

        # Make sure user's card has no next level cost
        user_card = self.user_profile.user_cards.first()
        user_card.card.next_level_cost = None
        user_card.card.save()

        # Try to upgrade card
        self.assertRaises(CannotUpgradeCardException, upgrade_card, user_card=user_card)
