from django.urls import path

from .views import UserRegister, UserList, AuthTokenView

urlpatterns = [
    path('', UserList.as_view(), name='users-list'),
    path('register/', UserRegister.as_view(), name='users-register'),
    path('api-token-auth/<str:username>/', AuthTokenView.as_view())
]
