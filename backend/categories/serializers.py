from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Place , place_Images
from reviews.serializers import ReviewSerializer

class PlaceImageSerializer(ModelSerializer):
  class Meta:
    model = place_Images
    fields = '__all__'


class PlaceSerializer(ModelSerializer):
    place_images_set = PlaceImageSerializer(many=True, read_only=False)
    review_set = ReviewSerializer(many=True, read_only=True)
    # thumbnail_url = SerializerMethodField()

    class Meta:
        model = Place
        fields = '__all__'
        
    # def get_thumbnail_url(self, obj):
    #     if obj.thumbnail:
    #         return self.context['request'].build_absolute_uri(obj.thumbnail.url)
    #     else:
    #         return None