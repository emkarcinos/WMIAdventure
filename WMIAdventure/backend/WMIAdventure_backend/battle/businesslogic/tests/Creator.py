from typing import Optional

from IngameUsers.models import UserProfile, Deck, UserCard, UserDeck
from cards.models import CardInfo, Card, CardLevel, CardLevelEffects, CardEffect
from users.models import User


class Creator:
    """
    Creates a sample pool of objects required for unit testing.
    Each constructor call the objects previously created are deleted.
    Recommended use case is to put it inside setUpClass methods.
    """

    def perform_deletion(self):
        """
        Deletes all objects that might have been persistent inside the database.
        """

        self.user_profile_model1.delete()
        self.user_profile_model2.delete()

        self.user_model1.delete()
        self.user_model2.delete()

        for c in self.cards:
            c.delete()

        for i in self.infos:
            i.delete()

    def get_user_models(self):
        """
        Returns a tuple of user_model1, user_model2.
        """
        return self.user_model1, self.user_model2

    def get_user_profile_models(self):
        """
        Returns a tuple of user_profile_model1, user_profile_model2.
        """
        return self.user_profile_model1, self.user_profile_model2

    def get_cards(self):
        """
        Returns an array of all cards created.
        """
        return self.cards

    def get_decks(self, user=1):
        """
        Returns a tuple of attacker_deck, defender_deck for specified user number.
        """
        if user == 1:
            return self.p1_attacker_deck, self.p1_defender_deck
        return self.p2_attacker_deck, self.p2_defender_deck

    def get_attacker_deck(self, user=1):
        """
        @param user: First or second user.
        @return: Given user's attacker deck.
        """

        if user == 1:
            return self.p1_attacker_deck
        elif user == 2:
            return self.p2_attacker_deck

    def get_defender_deck(self, user=1):
        """
        @param user: First or second user.
        @return: Given user's defender deck.
        """

        if user == 1:
            return self.p1_defender_deck
        elif user == 2:
            return self.p2_defender_deck

    def __init__(self):

        self.user_model1 = User.objects.create(
            username="user1",
            email="user1@company.com"
        )

        self.user_model2 = User.objects.create(
            username="user2",
            email="user2@company.com"
        )

        self.user_profile_model1 = UserProfile(user=self.user_model1,
                                               displayedUsername="user1")
        self.user_profile_model2 = UserProfile(user=self.user_model2,
                                               displayedUsername="user2")
        self.user_profile_model1.save()
        self.user_profile_model2.save()
        # Creating 5 test cards
        self.cards = []
        self.infos = []
        for i in range(5):
            card_info = CardInfo.objects.create(
                name=str(i),
                tooltip="Tooltip",
                image=None,
                subject=None
            )
            self.infos.append(card_info)
            card_info.save()

            card = Card.objects.create(
                info=card_info,
                level=CardLevel.objects.get(pk=1),
                next_level_cost=None
            )

            effect = CardLevelEffects.objects.create(card=card,
                                                     card_effect=CardEffect(CardEffect.EffectId.DMG),
                                                     target=CardLevelEffects.Target.OPPONENT,
                                                     power=1.0,
                                                     range=1.0)
            effect.save()
            card.save()
            self.cards.append(card)

        # Decks used by Player 1
        self.p1_attacker_deck = Deck()
        self.p1_defender_deck = Deck()

        # Decks used by Player 2
        self.p2_attacker_deck = Deck()
        self.p2_defender_deck = Deck()

        for i in range(len(self.cards)):
            # Creating a card that belongs to P1
            p1_card = UserCard.objects.create(user_profile=self.user_profile_model1,
                                              card=self.cards[i])
            # The same card also belongs to P2
            p2_card = UserCard.objects.create(user_profile=self.user_profile_model2,
                                              card=self.cards[i])
            p1_card.save()
            p2_card.save()
            # Sorry for this eval function call, this will fail if we modified field names in Deck model
            # Adding p1's cards to each deck (attacker and defender decks are the same here)
            exec("self.p1_attacker_deck.card{} = p1_card".format(i + 1))
            exec("self.p1_defender_deck.card{} = p1_card".format(i + 1))
            # Same for p2
            exec("self.p2_attacker_deck.card{} = p2_card".format(i + 1))
            exec("self.p2_defender_deck.card{} = p2_card".format(i + 1))

        self.p1_attacker_deck.save()
        self.p1_defender_deck.save()

        # Decks used by Player 2
        self.p2_attacker_deck.save()
        self.p2_defender_deck.save()

        user1_deck1 = UserDeck(deck_number=1,
                               deck=self.p1_defender_deck,
                               user_profile=self.user_profile_model1)
        user1_deck1.save()
        user1_deck2 = UserDeck(deck_number=2,
                               deck=self.p1_attacker_deck,
                               user_profile=self.user_profile_model1)
        user1_deck2.save()
        user2_deck1 = UserDeck(deck_number=1,
                               deck=self.p2_defender_deck,
                               user_profile=self.user_profile_model2)
        user2_deck1.save()
        user2_deck2 = UserDeck(deck_number=2,
                               deck=self.p2_attacker_deck,
                               user_profile=self.user_profile_model2)
        user2_deck2.save()

    def create_card_model(self, effects_data: list[
        tuple[CardEffect.EffectId, CardLevelEffects.Target, Optional[int], Optional[float]]],
                          name, card_level: Optional[CardLevel] = None, tooltip="...") -> Card:
        """
        Creates Card model with given effects data.

        :param effects_data: List of tuples containing data (effect_id, target, effect_power, effect_power_range) necessary to create card's effects. effect_power and effect_power_range can be None if effect doesn't need these fields (eg. TwoTimesExecuteEffect).
        :param card_level: Level, defaults to first level.
        :param name: Card name, must be unique.
        :param tooltip: Card tooltip.
        :return: Created Card model.
        """

        if card_level is None:
            card_level = CardLevel.objects.get(pk=1),
        card_info = CardInfo.objects.create(name=name, tooltip=tooltip)
        card = Card.objects.create(info=card_info, level=card_level)
        for card_effect_id, target, power, range_ in effects_data:
            card_effect = CardEffect.objects.get(id=card_effect_id)
            card.effects.create(card_effect=card_effect, target=target,
                                power=power, range=range_)
        return card

    def create_user_card(self, user_profile: UserProfile, effects_data: list[
        tuple[CardEffect.EffectId, CardLevelEffects.Target, Optional[int], Optional[float]]],
                         name, card_level: Optional[CardLevel] = None, tooltip="...") -> UserCard:
        """
        Creates UserCard object by creating Card model with given effects data and linking created Card
        with given UserProfile.

        :param user_profile: Card owner.
        :param effects_data: List of tuples containing data (effect_id, target, effect_power, effect_power_range) necessary to create card's effects. effect_power and effect_power_range can be None if effect doesn't need these fields (eg. TwoTimesExecuteEffect).
        :param card_level: Level, defaults to first level.
        :param name: Card name, must be unique.
        :param tooltip: Card tooltip.
        :return: Created UserCard model.
        """
        if card_level is None:
            card_level = CardLevel.objects.get(pk=1)
        card = self.create_card_model(effects_data, name, card_level, tooltip)
        user_card = user_profile.user_cards.create(card=card)
        return user_card

    def create_user_deck(self, user_profile: UserProfile,
                         user_card1: UserCard, user_card2: UserCard,
                         user_card3: UserCard, user_card4: UserCard,
                         user_card5: UserCard, deck_number=1) -> UserDeck:
        """
        Creates UserDeck object which is owned by given UserProfile.

        :param user_profile: Owner of the deck.
        :param user_card1:
        :param user_card2:
        :param user_card3:
        :param user_card4:
        :param user_card5:
        :param deck_number:
        :return: Created UserDeck.
        """
        deck_model = Deck.objects.create(
            card1=user_card1,
            card2=user_card2,
            card3=user_card3,
            card4=user_card4,
            card5=user_card5,
        )
        user_deck = user_profile.user_decks.create(deck_number=deck_number, deck=deck_model)
        return user_deck

    def __del__(self):
        self.perform_deletion()
