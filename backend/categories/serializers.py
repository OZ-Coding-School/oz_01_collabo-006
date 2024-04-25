from rest_framework.serializers import ModelSerializer
from .models import Place , place_Images
from reviews.serializers import ReviewSerializer

class PlaceImageSerializer(ModelSerializer):
  class Meta:
    model = place_Images
    fields = '__all__'


class PlaceSerializer(ModelSerializer):
  
  place_images_set = PlaceImageSerializer(many=True,read_only=False)
  review_set = ReviewSerializer(many=True,read_only=True)
  
  class Meta:
    model = Place
    fields = '__all__'
    
