from django.urls import path
from .views import ReviewViewSet
from .models import Review

urlpatterns = [
  path('', ReviewViewSet.as_view({'get':'list'}), name='reviews')
]