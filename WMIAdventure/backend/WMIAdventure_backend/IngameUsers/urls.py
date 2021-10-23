from django.urls import path
from .views import UserDeckView, PaginatedUsersView, UserView

urlpatterns = [
    path('', PaginatedUsersView.as_view(), name='user profiles'),
    path('<int:pk>/', UserView.as_view(), name='user profile'),
    path('<int:pk>/decks/', UserDeckView.as_view(), name='decks'),
]
