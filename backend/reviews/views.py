from django.shortcuts import render
from .models import Review

# viewsets 사용을 위한 추가
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import ReviewSerializer
# Create your views here.

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def list(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    # def update(self, request, pk=None):
    #     pass

    def partial_update(self, request, pk=None):
        pass

    # def destroy(self, request, pk=None):
    #     pass