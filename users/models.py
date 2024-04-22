from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser
from common.models import CommonModel
from .manager import CustomUserManager


class User(AbstractUser):
    nickname = models.CharField(
        max_length=50,
        unique=True,
        validators=[MinLengthValidator(2, "닉네임은 두 글자 이상이어야 합니다.")],
        default="default_nickname"  # 기본값 설정
    )
    email = models.EmailField(
        verbose_name='이메일',
        max_length=255,
        unique=True,
        error_messages={"unique": "이미 존재하는 이메일입니다."}
    )
    is_active = models.BooleanField(default=False)  # 이메일 인증 전에는 비활성화 // 이메일 인증 후 활성화

    SOCIAL_TYPE_CHOICES = (
        ("email", "Email"),
        ("naver", "Naver"),
    )
    social_type = models.CharField(
        max_length=10, choices=SOCIAL_TYPE_CHOICES, default="email"
    )

    REQUIRED_FIELDS = ['email', 'nickname']

    objects = CustomUserManager()

    def __str__(self):
        return self.nickname


class FeedbackUser(CommonModel):
    feedback_name = models.CharField(max_length=7, blank=False)
    feedback_email = models.EmailField(blank=False)
    feedback_content = models.TextField(max_length=50, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.feedback_name
