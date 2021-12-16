from django.urls import path

from .views import UserDecksView, PaginatedUsersView, UserView, UserDeckView, UserLevelView

urlpatterns = [
    path('', PaginatedUsersView.as_view(), name='user profiles'),
    path('<int:pk>/', UserView.as_view(), name='user profile'),
    path('<int:pk>/level/', UserLevelView.as_view(), name='user level info'),
    path('<int:pk>/decks/', UserDecksView.as_view(), name='decks'),
    path('<int:pk>/decks/<int:deck_number>/', UserDeckView.as_view(), name='deck'),
]
