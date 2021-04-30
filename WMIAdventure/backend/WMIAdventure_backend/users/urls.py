from django.urls import path
from .views import UserRegister, UserList

urlpatterns = [
    path('', UserList.as_view(), name='users-list'),
    path('register/', UserRegister.as_view(), name='users-register')
]
