from django.urls import path
from .views import CardLevelList

urlpatterns = [
    path('card-level/', CardLevelList.as_view(), name='cards-levels-list')
]
