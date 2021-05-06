from django.urls import path
from .views import *

urlpatterns = [
    path('card-effect/', CardEffectList.as_view(), name='card-effect'),
    path('card-effect/<int:pk>/', CardEffectObjectView.as_view()),
    path('card-level/', CardLevelList.as_view(), name='cards-levels-list'),
    path('card-level/<int:pk>/', CardLevelDetail.as_view(), name='cards-level-details'),
    path('all/', CardsView.as_view(), name='all-cards'),
    path('all/<int:pk>/', CardSingleView.as_view(), name='card')
]
