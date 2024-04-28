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

    # def list(self, request):
        # pass

    def create(self, request):
        pass

    # def retrieve(self, request, pk=None):
        # pass

    # def update(self, request, pk=None):
        # pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass