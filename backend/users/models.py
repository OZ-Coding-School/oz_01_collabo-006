from django.db import models
from django.contrib.auth.models import AbstractUser
from users import CustomUserManager
from django.core.validators import MinLengthValidator


# Create your models here.
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
    null=False,
    error_messages={"unique": "이미 존재하는 이메일입니다."}
  )
  is_active = models.BooleanField(default=False)  # 이메일 인증 전에는 비활성화 // 이메일 인증 후 활성화
  
  profile_image = models.ImageField(
    "프로필_이미지", upload_to='users/profile', blank=True
  )

  SOCIAL_TYPE_CHOICES = (
    ("email", "Email"),
    ("naver", "Naver"),
  )
  social_type = models.CharField(
    max_length=10, choices=SOCIAL_TYPE_CHOICES, default="email"
  )
  def __str__(self):
    return self.nickname
  
  USERNAME_FIELD = 'email'  # 이메일을 사용자 식별자로 설정
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = ['email', 'nickname']

  objects = CustomUserManager()

class Dog(models.Model):
  id = models.fields.AutoField(primary_key=True)
  sizes = models.CharField('견종사이즈',max_length=25)
  min_weight = models.IntegerField('최소 무게',blank=True, null=True)
  max_weight = models.IntegerField('최대 무게',blank=True, null=True)
  
  def __str__(self):
    return self.sizes
  
  @classmethod
  def search_dogs_by_weight_range(cls, min_weight, max_weight):
    return cls.objects.filter(min_weight__gte=min_weight, max_weight__lte=max_weight)

