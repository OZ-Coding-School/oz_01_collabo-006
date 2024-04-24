import re
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework import serializers 
from .models import User
from django.contrib.auth.hashers import make_password


# 유저 정보 조회, 수정 및 삭제 시 필요한 정보 ( user용 )
# get / put / delete
# class LoginSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = User
#     fields = (
#         "first_name",
#         "last_name",
#         "email",
#         "password",
#         "dogs_size",
#         'profile_image',
#         'short_description',
#     )


class MypageSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
        "first_name",
        "last_name",
        "password",
        "dogs_size",
        'profile_image',
        'short_description',
    )

class ChangePasswordSerializer(serializers.Serializer):
  old_password = serializers.CharField(required=True)
  new_password = serializers.CharField(required=True)
  password_confirm = serializers.CharField(write_only=True)

  def validate_old_password(self, value):
      # 현재 비밀번호가 맞는지 확인하는 로직
    if not self.context['request'].user.check_password(value):
      raise serializers.ValidationError("Incorrect password")
    return value
  
  def validate(self, data):
    if data['new_password'] != data.pop('password_confirm'):
        raise serializers.ValidationError("Passwords do not match")
    return data
        
class SignupSerializer(serializers.ModelSerializer):
  password_confirm = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = (
      'email',
      'password',
      'password_confirm',
      "first_name",
      "last_name",
      "dogs_size",
      'profile_image',
      'short_description',
    )

  def validate_email(self, value):
    if User.objects.filter(email=value).exists():
      raise serializers.ValidationError("Email address already exists")
    return value

  def validate(self, data):
    if data['password'] != data.pop('password_confirm'):
        raise serializers.ValidationError("Passwords do not match")
    return data

  def create(self, validated_data):
    password = validated_data.pop('password')
    user = User.objects.create_user(**validated_data)
    user.set_password(password)
    user.save()
    return user

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







