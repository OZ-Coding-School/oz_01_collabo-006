from django.urls import path, include
# from categories.views import places
from categories.views import  SearchAPIView, PlaceDetailAPIView # PlaceViewSet, PlaceSearchAPIView, Category1SearchAPIView, Category2SearchAPIView,Where1SearchAPIView , Where2SearchAPIView
from rest_framework.routers import DefaultRouter


# router = DefaultRouter()
# router.register(r'places', PlaceViewSet)

urlpatterns = [
  # 메소드를 따로 지정하지 않아도 사용할수 있는 방식
  path('places/', SearchAPIView.as_view(), name='search_api'),
  path('places/<int:pk>/', PlaceDetailAPIView.as_view(), name='id_search'),
  # path('',include(router.urls), name="places"),
  # path('places/category1/<str:search_query>/', Category1SearchAPIView.as_view(), name='Category1'),
  # path('places/category2/<str:search_query>/', Category2SearchAPIView.as_view(), name='Category2'),
  # path('places/where1/<str:search_query>/', Where1SearchAPIView.as_view(), name='Place_Where1'),
  # path('places/where2/<str:search_query>/', Where2SearchAPIView.as_view(), name='Place_Where2'),

  
  # 메소드를 따로따로 지정하는 방식
  # path('', PlaceViewSet.as_view({'get':'list'}), name='places'),
  # path('{place_id}', PlaceViewSet.as_view({'get':'retrieve'}), name='places'),
  
  # path('places/', places, name='places'),
]