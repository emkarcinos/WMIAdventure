from IngameUsers.models import UserProfile
from .Deck import Deck
from .Player import Player


class PlayerFactory:
    instance = None

    @staticmethod
    def get_instance():
        if PlayerFactory.instance is None:
            PlayerFactory.instance = PlayerFactory()
        return PlayerFactory.instance

    def create(self, user_profile_model: UserProfile, is_attacker=False):
        """
        Create a BattlePlayer object based on user_profile model
        @param user_profile_model: Database model of UserProfile.
        @param is_attacker: set to true, if this user is the attacker.
        @return: Instance of BattlePlayer.
        """

        id = user_profile_model.user.id
        user_decks = user_profile_model.user_decks.all()
        # TODO: Getting the decks is this way is kind of stupid. Enum would be better.
        deck = None
        if is_attacker and len(user_decks) == 2:
            deck = user_decks[1].deck
        else:
            deck = user_decks[0].deck
        return Player(id=id, deck=Deck(deck_model=deck))
