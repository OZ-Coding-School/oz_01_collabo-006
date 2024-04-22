from django.urls import path, include
# from categories.views import places
from categories.views import PlaceViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'places', PlaceViewSet)

urlpatterns = [
  # 메소드를 따로 지정하지 않아도 사용할수 있는 방식
  path('',include(router.urls), name="places"),
  
  # 메소드를 따로따로 지정하는 방식
  # path('', PlaceViewSet.as_view({'get':'list'}), name='places'),
  # path('{place_id}', PlaceViewSet.as_view({'get':'retrieve'}), name='places'),
  
  # path('places/', places, name='places'),
]