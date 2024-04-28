from django.shortcuts import render, redirect
from .models import Place, place_Images
from users.models import Dog

from django.core.paginator import Paginator
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
            openapi.Parameter('page', openapi.IN_QUERY, description="페이지 번호", type=openapi.TYPE_INTEGER, default=1),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="페이지 크기", type=openapi.TYPE_INTEGER, default=80),
            openapi.Parameter('province', openapi.IN_QUERY, description="시/도", type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('city', openapi.IN_QUERY, description="시/군/구", type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('category2', openapi.IN_QUERY, description="카테고리", type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('dog_size', openapi.IN_QUERY, description="견종크기", type=openapi.TYPE_STRING, required=False),
            openapi.Parameter('search', openapi.IN_QUERY, description="시설명 검색어", type=openapi.TYPE_STRING, required=False),
        ]
    )
    def get(self, request):
        try:
            # 쿼리 파라미터 가져오기
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 80))

            # 드롭다운으로 선택된 값들을 쿼리 파라미터에서 가져옵니다.

            # # Place_Where1에서 province와 city를 추출합니다.
            # if province_city:
            #     parts = province_city.split(' ')
            #     if len(parts) >= 2:
            #         province = parts[0]
            #         city = parts[1]
            #     else:
            #         province = province_city
            #         city = None
            # else:
            #     province = None
            #     city = None

            places = Place.objects.all()
            province = request.GET.get('province',None)
            city = request.GET.get('city',None)
            category2 = request.GET.get('category2', None)
            dog_size = request.GET.get('dog_size', None)

            # 시설명 검색어를 쿼리 파라미터에서 가져옵니다.
            search_query = request.GET.get('search', None)

            # 드롭다운으로 선택된 값들에 따라 필터링합니다.
            # province와 city로 필터링합니다.
            if province:
                places = places.filter(Province__contains=province) # 나중에 Province__exact 로 수정하기
            if city:
                places = places.filter(City__startswith=city)

            # 나머지 필터링 조건들을 적용합니다.
            if category2:
                places = places.filter(Category2__contains=category2) # 나중에 Category2__exact 로 수정하기
            # if dog_size:
            #     places = places.filter(Dog_Size__contains=dog_size)

            from .util import filter_places_by_dog_size
            
            filtered_places = filter_places_by_dog_size(places, dog_size)
            
            # import re
            # # 각 인스턴스에서 Dog_Size 속성을 가져와서 리스트에 저장합니다.
            # place_dog = [place.Dog_Size for place in places]
            # numbers = [int(re.search(r'\d+', size).group()) for size in place_dog_sizes if re.search(r'\d+', size)]

            # # SearchAPIView 내의 get 메서드 내부에 해당하는 부분
            # if dog_size:
            #     # Dog_Size 필드에서 해당하는 문자열을 포함하는 데이터를 찾습니다.
            #     dog = Dog.objects.filter(sizes__contains=dog_size).first()

            #     # 검색된 견종이 없는 경우
            #     if not dog:
            #         # 적절한 에러 처리를 수행합니다.
            #         return Response({"error": "검색된 견종이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

            #     min_weight = dog.min_weight
            #     places = places.filter(Q(Dog_Size__contains=dog_size) | (Q(min_weight__gte=min_weight)))
                # Dog_Size 문자열에서 숫자만 추출합니다.
                # numbers = re.findall(r'\d+', dog_size)

                # # 숫자가 포함된 데이터가 없는 경우
                # if not numbers:
                #     # 적절한 에러 처리를 수행합니다.
                #     return Response({"error": "검색된 데이터에 숫자가 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

                # # 추출된 숫자를 정렬하여 최소값과 최대값을 확인합니다.
                # min_weight = min(map(int, numbers))
                # max_weight = max(map(int, numbers))
                # min_weight = dog.min_weight
                # max_weight = dog.max_weight

                # 최소 무게보다 크거나 같고, 최대 무게보다 작은 데이터를 필터링합니다.
                # places = places.filter(Q(Dog_Size__contains=dog_size) | (Q(min_weight__gte=min_weight))

            #     # 견종에 따른 장소 필터링
            #     places = places.filter(dog__in=dog)

            # 검색어가 주어진 경우, 시설명에 검색어가 포함된 장소를 필터링합니다.
            if search_query:
                places = places.filter(Place_Name__contains=search_query)

            paginator = Paginator(places, page_size)
            page_data = paginator.get_page(page)

            # PlaceSerializer를 사용하여 쿼리셋을 직렬화합니다.
            serializer = PlaceSerializer(page_data, many=True)
            
            # 드롭다운으로 보낼 데이터를 가져옵니다.
            dropdown_data = {
                'provinces': Place.objects.values_list('Province', flat=True).distinct(),
                'cities': set(),
                'categories': Place.objects.values_list('Category2', flat=True).distinct().order_by(),
                # 'dog_sizes': Place.objects.values_list('Dog_Size', flat=True).distinct()
            }
            


            # 사용자가 선택한 Province
            # selected_province = request.GET.get('province', '')


            # # 시티 데이터 수정
            # city_data = Place.objects.filter(Province__contains=selected_province).values_list('City', flat=True).distinct()
            # # city_data = Place.objects.values_list('City', flat=True).distinct()
            # splitted_cities = [City.split()[0] if City else "" for City in city_data]  # 스플릿하여 0번 인덱스만 추출
            # dropdown_data['cities'].update(splitted_cities)
            
            city_data = Place.objects.values('Province', 'City').order_by('Province', 'City')

            # 각 Province에 속하는 City 목록을 저장하기 위한 딕셔너리 생성
            province_city_dict = {}

            # 시티 데이터를 기반으로 각 Province에 속하는 City를 모아서 저장
            for item in city_data:
                province = item['Province']
                city = item['City'].split()[0] if item['City'] else ""
                # province = sorted(province_a)
                # city = sorted(city_a)
                if province in province_city_dict:
                    province_city_dict[province].add(city)
                else:
                    province_city_dict[province] = {city}
                    
            for province, cities in province_city_dict.items():
                sorted_cities = sorted(cities)
                province_city_dict[province] = sorted_cities
                
            # dropdown_data에 저장
            dropdown_data['provinces'] = province_city_dict

            
            # 직렬화된 데이터와 드롭다운 데이터를 합쳐 응답합니다.
            response_data = {
                'places': serializer.data,
                'dropdown_data': dropdown_data
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
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
