from django.urls import path
from .views import CardEffectList, CardEffectObjectView, CardLevelList, CardLevelDetail, WholeCardDetails, WholeCardList

urlpatterns = [
    path('card-effect/', CardEffectList.as_view(), name='card-effect'),
    path('card-effect/<int:pk>/', CardEffectObjectView.as_view()),
    path('card-level/', CardLevelList.as_view(), name='cards-levels-list'),
    path('card-level/<int:pk>/', CardLevelDetail.as_view(), name='cards-level-details'),
    path('<int:pk>/', WholeCardDetails.as_view(), name='cards-card-details'),
    path('', WholeCardList.as_view(), name='cards-card-list')
]
