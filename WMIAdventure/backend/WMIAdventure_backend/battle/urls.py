from django.urls import path
from .views import *

urlpatterns = [
    path('<int:defender_id>/', BattleView.as_view(), name='battle-attack'),
]
