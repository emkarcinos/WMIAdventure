from django.urls import path
from .views import CardLevelList, CardLevelDetail

urlpatterns = [
    path('card-level/', CardLevelList.as_view(), name='cards-levels-list'),
    path('card-level/<int:pk>/', CardLevelDetail.as_view(), name='cards-level-details')
]
