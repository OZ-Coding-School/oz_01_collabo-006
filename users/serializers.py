import re
from rest_framework.exceptions import ParseError, ValidationError
from rest_framework import serializers 
from .models import User, FeedbackUser
from django.contrib.auth.hashers import make_password


# 유저 정보 조회, 수정 및 삭제 시 필요한 정보 ( user용 )
# get / put / delete
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "name",
            "tablecolor",
            "email",
            "password",
        )
        read_only_fields = ("pk",)


class MypageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "name",
            "email",
            "password",
        )
        read_only_fields = ("pk",)


# 유저 정보 자세히 조회 (admin용)
# get
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "name",
            "email",
            "is_admin",
            "date_joined",
            "last_login",
        )


class UsertableSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # User 모델을 사용하도록 수정
        fields = ("__all__",)



# 로그인 시 필요한 정보
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "email",
            "password",
        )
        read_only_fields = ("pk",)


# 회원가입 시 필요한 정보
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk",
            "name",
            "email",
            "password",
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


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackUser
        fields = (
            "pk",
            "feedback_name",
            "feedback_email",
            "feedback_content",
            "created_at",
        )
        read_only_fields = ("pk", "created_at")
