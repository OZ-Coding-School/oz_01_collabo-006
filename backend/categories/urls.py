from django.urls import path
from categories.views import places

urlpatterns = [
  path('places/', places, name='places'),
]