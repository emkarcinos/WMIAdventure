from IngameUsers.models import UserProfile


class BadBattleProfileException(Exception):
    def __init__(self, profile: UserProfile):
        message = f'User {profile.displayedUsername} does not have a valid battle profile'
        super().__init__(message)
