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

    def __del__(self):
        self.perform_deletion()
