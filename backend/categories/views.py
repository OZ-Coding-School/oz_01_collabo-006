from django.shortcuts import render, redirect
from .models import Place, place_Images

# viewsets 사용을 위한 추가
from rest_framework import viewsets
from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import PlaceSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from django.db.models import Q
from rest_framework.decorators import api_view

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
class PlaceDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            place = Place.objects.get(pk=pk)
        except Place.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlaceSerializer(place)
        return Response(serializer.data)


class SearchAPIView(APIView):
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="페이지 번호", type=openapi.TYPE_INTEGER),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="페이지 크기", type=openapi.TYPE_INTEGER),
            openapi.Parameter('province', openapi.IN_QUERY, description="시/도", type=openapi.TYPE_STRING),
            openapi.Parameter('city', openapi.IN_QUERY, description="시/군/구", type=openapi.TYPE_STRING),
            openapi.Parameter('category2', openapi.IN_QUERY, description="카테고리", type=openapi.TYPE_STRING),
            openapi.Parameter('dog_size', openapi.IN_QUERY, description="견종크기", type=openapi.TYPE_STRING),
            openapi.Parameter('search', openapi.IN_QUERY, description="시설명 검색어", type=openapi.TYPE_STRING),
        ]
    )
    def get(self, request):
        # 쿼리 파라미터 가져오기
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 80))
        
        # 드롭다운으로 선택된 값들을 쿼리 파라미터에서 가져옵니다.
        province_city = request.GET.get('Place_Where1')

        # Place_Where1에서 province와 city를 추출합니다.
        if province_city:
            parts = province_city.split(' ')
            if len(parts) >= 2:
                province = parts[0]
                city = parts[1]
            else:
                province = province_city
                city = None
        else:
            province = None
            city = None

        Category2 = request.GET.get('Category2')
        Dog_Size = request.GET.get('Dog_Size')
        
        # 시설명 검색어를 쿼리 파라미터에서 가져옵니다.
        search_query = request.GET.get('search')
        
        # Place 모델을 기반으로 쿼리셋을 필터링합니다.
        places = Place.objects.all()
        
        # 드롭다운으로 선택된 값들에 따라 필터링합니다.
        # province와 city로 필터링합니다.
        if province:   
            places = places.filter(place_where1__icontains=province)
        if city:
            places = places.filter(place_where1__icontains=city)
        
        # 나머지 필터링 조건들을 적용합니다.
        if Category2:
            places = places.filter(Category2=Category2)
        if Dog_Size:
            places = places.filter(Dog_Size=Dog_Size)
        
        # 검색어가 주어진 경우, 시설명에 검색어가 포함된 장소를 필터링합니다.
        if search_query:
            places = places.filter(name__icontains=search_query)
        
        # PlaceSerializer를 사용하여 쿼리셋을 직렬화합니다.
        serializer = PlaceSerializer(places, many=True)
    
        # 드롭다운으로 보낼 데이터를 가져옵니다.
        dropdown_data = {
            'provinces': set(),  # 중복을 피하기 위해 set 사용
            'cities': set(),     # 중복을 피하기 위해 set 사용
            'categories': Place.objects.values_list('Category2', flat=True).distinct(),
            'dog_sizes': Place.objects.values_list('Dog_Size', flat=True).distinct()
        }

        # Place_Where1에서 province와 city를 추출합니다.
        for place in Place.objects.all():
            place_where1 = place.place_where1
            parts = place_where1.split(' ')
            if len(parts) >= 2:
                province = parts[0]
                city = parts[1]
                dropdown_data['provinces'].add(province)
                dropdown_data['cities'].add(city)
            else:
                dropdown_data['provinces'].add(place_where1)

        # set을 list로 변환하여 순서를 유지하도록 합니다.
        dropdown_data['provinces'] = list(dropdown_data['provinces'])
        dropdown_data['cities'] = list(dropdown_data['cities'])

        
        # 직렬화된 데이터와 드롭다운 데이터를 합쳐 응답합니다.
        response_data = {
            'places': serializer.data,
            'dropdown_data': dropdown_data
        }

        return Response(response_data)
    
    
    
# 뷰셋사용과 퀴리파라미터 구현을 못했던 잔제

    # def list(self, request):
    #   pass

    # def create(self, request):
    #   pass

    # def retrieve(self, request, pk=None):
    #   pass

    # def update(self, request, pk=None):
    #   pass

    # def partial_update(self, request, pk=None):
    #   pass

    # def destroy(self, request, pk=None):
    #   pass





# class PlaceSearchAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 80

#     def get_queryset(self):
#       search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
#       queryset = Place.objects.all()
      
#       if search_query:
#             queryset = queryset.filter(
#                 Q(Category1__icontains=search_query) |
#                 Q(Category2__icontains=search_query) |
#                 Q(place_where1__icontains=search_query) |
#                 Q(place_where2__icontains=search_query) |
#                 Q(Place_Name__icontains=search_query) 
#             )
#       # else:
#       #     queryset = Place.objects.all()
#       return queryset
  
# class Category1SearchAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 20

#     def get_queryset(self):
#       search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기

#       queryset = Place.objects.all()
      
#       if search_query:
#             queryset = queryset.filter(
#                 Q(Category1__icontains=search_query) &
#                 Q(Category2__icontains=search_query) |
#                 Q(place_where1__icontains=search_query) |
#                 Q(place_where2__icontains=search_query) |
#                 Q(Place_Name__icontains=search_query) 
#             )
#       # else:
#       #     queryset = Place.objects.all()
#       return queryset
# class Category2SearchAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 20

#     def get_queryset(self):
#       search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
#       queryset = Place.objects.all()
      
#       if search_query:
#             queryset = queryset.filter(
#                 Q(Category1__icontains=search_query) &
#                 Q(Category2__icontains=search_query) &
#                 Q(place_where1__icontains=search_query) |
#                 Q(place_where2__icontains=search_query) |
#                 Q(Place_Name__icontains=search_query) 
#             )
#       # else:
#       #     queryset = Place.objects.all()
#       return queryset
    
# class Where1SearchAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 20

#     def get_queryset(self):
#       search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
#       queryset = Place.objects.all()
      
#       if search_query:
#             queryset = queryset.filter(
#                 Q(place_where1__icontains=search_query) &
#                 Q(place_where2__icontains=search_query) |
#                 Q(Category1__icontains=search_query) |
#                 Q(Category2__icontains=search_query) |
#                 Q(Place_Name__icontains=search_query) 
#             )
#       # else:
#       #     queryset = Place.objects.all()
#       return queryset
# class Where2SearchAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 20

#     def get_queryset(self):
#       search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
#       queryset = Place.objects.all()
      
#       if search_query:
#             queryset = queryset.filter(
#                 Q(Category1__icontains=search_query) &
#                 Q(Category2__icontains=search_query) &
#                 Q(place_where1__icontains=search_query) &
#                 Q(place_where2__icontains=search_query) &
#                 Q(Place_Name__icontains=search_query) 
#             )
#       # else:
#       #     queryset = Place.objects.all()
#       return queryset

# # Create your views here.
# def places(request):
#   # # 요청(request)으로부터 사용자 정보를 가져온다.
#   # user = request.user
  
#   # # 가져온 사용자가 '로그인 했는지' 여부를 가져온다
#   # is_authenticated = user.is_authenticated
  
#   # print('user:',user)
#   # print('is_authenticated:',is_authenticated)
  
#   #요청에 포함된 사용자가 로그인하지 않은 경우(AnonymousUser 인 경우)
#   if not request.user.is_authenticated:
#     return redirect(request, 'api/v1/users/login/')
  
#   return render(request, 'categories/places.html')

# APIview 를 사용할떄 
# from rest_framework.views import APIView

# class PlaceListCreateAPIView(APIView):
#     def get(self, request):
#         places = Place.objects.all()
#         serializer = PlaceSerializer(places, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = PlaceSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class PlaceRetrieveUpdateDestroyAPIView(APIView):
#     def get_object(self, pk):
#         try:
#             return Place.objects.get(pk=pk)
#         except Place.DoesNotExist:
#             return None

#     def get(self, request, pk):
#         place = self.get_object(pk)
#         if place:
#             serializer = PlaceSerializer(place)
#             return Response(serializer.data)
#         return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         place = self.get_object(pk)
#         if place:
#             serializer = PlaceSerializer(place, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         place = self.get_object(pk)
#         if place:
#             place.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response({'error': 'Place not found'}, status=status.HTTP_404_NOT_FOUND)