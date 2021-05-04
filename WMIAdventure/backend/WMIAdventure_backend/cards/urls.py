from django.urls import path
from .views import CardEffectList, CardEffectObjectView, CardLevelList, CardLevelDetail

urlpatterns = [
    path('card-effect/', CardEffectList.as_view(), name='card-effect'),
    path('card-effect/<int:pk>/', CardEffectObjectView.as_view()),
    path('card-level/', CardLevelList.as_view(), name='cards-levels-list'),
    path('card-level/<int:pk>/', CardLevelDetail.as_view(), name='cards-level-details')
]
