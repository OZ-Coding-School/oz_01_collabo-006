from rest_framework.serializers import ModelSerializer
from .models import Place , place_Image
from reviews.serializers import ReviewSerializer

class PlaceImageSerializer(ModelSerializer):
  class Meta:
    model = place_Image
    fields = '__all__'


class PlaceSerializer(ModelSerializer):
  
  place_image_set = PlaceImageSerializer(many=True,read_only=False)
  review_set = ReviewSerializer(many=True,read_only=True)
  
  class Meta:
    model = Place
    fields = '__all__'
    
