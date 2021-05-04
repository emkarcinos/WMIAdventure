from django.urls import path
from .views import CardEffectList, CardEffectObjectView

urlpatterns = [
    path('card-effect/', CardEffectList.as_view(), name='card-effect'),
    path('card-effect/<int:pk>', CardEffectObjectView.as_view())
]