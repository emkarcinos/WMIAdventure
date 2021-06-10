from django.urls import path

from .views import *

urlpatterns = [
    path('cards/', WholeProposedCardList.as_view(), name='proposed-cards'),
]
