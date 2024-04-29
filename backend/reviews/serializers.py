from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Review

class ReviewSerializer(ModelSerializer):
  last_name = SerializerMethodField()  # SerializerMethodField를 사용하여 사용자의 이름 필드 추가
  class Meta:
    model = Review
    fields = (
      'id',
      'user',
      'last_name',
      'place',
      'content',
      'created_at',
    )
  
  def get_last_name(self, obj):
    return obj.user.last_name  # 사용자의 이름을 반환하는 메서드 작성