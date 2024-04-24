import re
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework import serializers 
from .models import User
from django.contrib.auth.hashers import make_password


class MypageSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'pk',
      'email'
      'first_name',
      'last_name',
      'password',
      'dogs_size',
      'profile_image',
    )
    read_only_fields = ('pk',)

# 유저 정보 자세히 조회 (admin용)
# get
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'pk',
      'name',
      'email',
      'password',
    )
    read_only_fields = ('pk',)

class LoginSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
        "pk",
        "email",
        "password",
    )
    read_only_fields = ("pk",)


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
  class Meta:
    model = User
    fields = (
      "pk",
      'email',
      'password',
      'password_confirm',
      'first_name',
      'last_name',
      'dogs_size',
      'profile_image',
    )

  def validate_password(self, password):
    if password:
      if not re.search(r"[a-z,A-Z]", password):
        raise ValidationError("비밀번호는 영문을 포함해야 합니다.")
      if not re.search(r"[0-9]", password):
        raise ValidationError("비밀번호는 숫자를 포함해야 합니다.")
      if len(password) < 8 or len(password) > 16:
        raise ValidationError("비밀번호는 8자 이상 16자 이하이어야 합니다.")
      print(password)
    else:
      raise ParseError("비밀번호를 입력하세요.")
    return password

  def create(self, validated_data):
    password = validated_data.pop('password')
    user = User.objects.create_user(**validated_data)
    user.set_password(password)
    user.save()
    return user

class UsertableSerializer(serializers.ModelSerializer):
  class Meta:
    model = User  # User 모델을 사용하도록 수정
    fields = ("__all__",)





