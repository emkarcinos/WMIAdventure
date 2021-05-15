from IngameUsers.models import UserProfile
from IngameUsers.models import UserDeck
from .BattleDeck import BattleDeck
from .BattlePlayer import BattlePlayer


class BattlePlayerFactory:
    instance = None

    @staticmethod
    def get_instance():
        if BattlePlayerFactory.instance is None:
            BattlePlayerFactory.instance = BattlePlayerFactory()
        return BattlePlayerFactory.instance

    def create(self, user_profile_model: UserProfile, is_attacker=False):
        """
        Create a BattlePlayer object based on user_profile model
        @param user_profile_model: Database model of UserProfile.
        @param is_attacker: set to true, if this user is the attacker.
        @return: Instance of BattlePlayer.
        """

        id = user_profile_model.user.id
        users_decks = UserDeck.objects.filter(user_profile=user_profile_model)
        # TODO: Getting the decks is this way is kind of stupid. Enum would be better.
        deck = None
        if is_attacker and len(users_decks) == 2:
            deck = users_decks[1].deck
        else:
            deck = users_decks[0].deck
        return BattlePlayer(id=id, deck=BattleDeck(deck_model=deck))


