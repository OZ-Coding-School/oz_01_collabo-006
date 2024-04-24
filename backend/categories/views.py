from django.shortcuts import render, redirect
from .models import Place, place_Image

# viewsets 사용을 위한 추가
from rest_framework import viewsets
from rest_framework import status, generics
from rest_framework.response import Response
from .serializers import PlaceSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from django.db.models import Q
class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    
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





class PlaceSearchAPIView(ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    def get_queryset(self):
      search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
      queryset = Place.objects.all()
      
      if search_query:
            queryset = queryset.filter(
                Q(Category1__icontains=search_query) |
                Q(Category2__icontains=search_query) |
                Q(place_where1__icontains=search_query) |
                Q(place_where2__icontains=search_query) |
                Q(Place_Name__icontains=search_query) 
            )
      # else:
      #     queryset = Place.objects.all()
      return queryset
class Category1SearchAPIView(ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    def get_queryset(self):
      search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
      queryset = Place.objects.all()
      
      if search_query:
            queryset = queryset.filter(
                Q(Category1__icontains=search_query) &
                Q(Category2__icontains=search_query) |
                Q(place_where1__icontains=search_query) |
                Q(place_where2__icontains=search_query) |
                Q(Place_Name__icontains=search_query) 
            )
      # else:
      #     queryset = Place.objects.all()
      return queryset
class Category2SearchAPIView(ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    def get_queryset(self):
      search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
      queryset = Place.objects.all()
      
      if search_query:
            queryset = queryset.filter(
                Q(Category1__icontains=search_query) &
                Q(Category2__icontains=search_query) &
                Q(place_where1__icontains=search_query) |
                Q(place_where2__icontains=search_query) |
                Q(Place_Name__icontains=search_query) 
            )
      # else:
      #     queryset = Place.objects.all()
      return queryset
    
class Where1SearchAPIView(ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    def get_queryset(self):
      search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
      queryset = Place.objects.all()
      
      if search_query:
            queryset = queryset.filter(
                Q(place_where1__icontains=search_query) &
                Q(place_where2__icontains=search_query) |
                Q(Category1__icontains=search_query) |
                Q(Category2__icontains=search_query) |
                Q(Place_Name__icontains=search_query) 
            )
      # else:
      #     queryset = Place.objects.all()
      return queryset
class Where2SearchAPIView(ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20

    def get_queryset(self):
      search_query = self.kwargs.get('search_query')  # URL 경로에서 검색어 가져오기
      queryset = Place.objects.all()
      
      if search_query:
            queryset = queryset.filter(
                Q(Category1__icontains=search_query) &
                Q(Category2__icontains=search_query) &
                Q(place_where1__icontains=search_query) &
                Q(place_where2__icontains=search_query) &
                Q(Place_Name__icontains=search_query) 
            )
      # else:
      #     queryset = Place.objects.all()
      return queryset

# class QueryParamsAPIView(ListAPIView):
#     serializer_class = PlaceSerializer
#     pagination_class = PageNumberPagination
#     pagination_class.page_size = 20
  
#     def get_queryset(self):
#         search_query = self.request.query_params.get('query', None)
#         queryset = Place.objects.all()

#         if search_query:
#             queryset = queryset.filter(
#                 Q(Place_Name__icontains=search_query) |
#                 Q(Category1__icontains=search_query) |
#                 Q(Category2__icontains=search_query) |
#                 Q(place_where1__icontains=search_query) |
#                 Q(place_where2__icontains=search_query)
#             )

#         return queryset

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