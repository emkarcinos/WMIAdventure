from django.urls import path

from .views import UserDecksView, PaginatedUsersView, UserView, UserDeckView, UserLevelView, UserCardsView, \
    UpgradeCardView

urlpatterns = [
    path('', PaginatedUsersView.as_view(), name='user profiles'),
    path('<int:pk>/', UserView.as_view(), name='user profile'),
    path('<int:pk>/level/', UserLevelView.as_view(), name='user level info'),
    path('<int:pk>/cards/', UserCardsView.as_view(), name='user-cards'),
    path('<int:pk>/cards/<int:card_id>/upgrade/', UpgradeCardView.as_view(), name='upgrade-card'),
    path('<int:pk>/decks/', UserDecksView.as_view(), name='decks'),
    path('<int:pk>/decks/<int:deck_number>/', UserDeckView.as_view(), name='deck'),
]
