from django.urls import path

from .views import UserRegister, UserList, WhoAmIView, LoginView

urlpatterns = [
    path('', UserList.as_view(), name='users-list'),
    path('register/', UserRegister.as_view(), name='users-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('whoami/', WhoAmIView.as_view())
]
