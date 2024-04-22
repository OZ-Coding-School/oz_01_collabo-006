import re
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework import serializers 
from .models import User
from django.contrib.auth.hashers import make_password


# 유저 정보 조회, 수정 및 삭제 시 필요한 정보 ( user용 )
# get / put / delete
class LoginSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
        "first_name",
        "last_name",
        "email",
        "password",
        "dogs_size",
        'profile_image',
        'short_description',
    )


class MypageSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
        "first_name",
        "last_name",
        "email",
        "password",
        "dogs_size",
        'profile_image',
        'short_description',
    )

        
class SignupSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

# 유저 정보 자세히 조회 (admin용)
# get
# class UserListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = (
#             "pk",
#             "name",
#             "email",
#             "is_admin",
#             "date_joined",
#             "last_login",
#         )


# class UsertableSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User  # User 모델을 사용하도록 수정
#         fields = ("__all__",)







