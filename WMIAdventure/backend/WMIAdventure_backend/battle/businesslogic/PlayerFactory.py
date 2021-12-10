from IngameUsers.models import UserProfile
from .BadBattleProfileException import BadBattleProfileException
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
        @raise BadBattleProfileException: If given user profile model doesn't have decks.
        """

        id_ = user_profile_model.user.id
        deck_model = self._choose_deck_model(user_profile_model, is_attacker)
        return Player(id=id_, deck=Deck(deck_model=deck_model))

    def _choose_deck_model(self, user_profile_model: UserProfile, is_attacker: bool):
        """
        Chooses deck for player, depending if he's attacker or defender.
        Possible decks: deck for attacking and defending.
        @param user_profile_model: Player profile.
        @param is_attacker:
        @return: Chosen deck.
        @raise BadBattleProfileException: If given user profile model doesn't have decks.
        """

        # TODO: Getting the decks is this way is kind of stupid. Enum would be better.
        user_decks = user_profile_model.user_decks.all()

        if len(user_decks) == 0:
            raise BadBattleProfileException(user_profile_model)

        # TODO: Uncomment this for attacker/defender deck support
        """
        if is_attacker and len(user_decks) == 2:
            return user_decks[1].deck
        else:
            return user_decks[0].deck
        """
        return user_decks[0].deck
