from django.conf.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserDeckView

router = DefaultRouter()
router.register('', views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/decks/', UserDeckView.as_view(), name='decks'),
]
