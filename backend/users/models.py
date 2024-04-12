from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import CustomUserManager

# Create your models here.
class User(AbstractUser):
  """
  사용자 모델입니다.

  이메일을 사용자 ID로 사용하기 떄문에 이메일에 유니크 설정을 줬습니다.
  """
  email = models.EmailField(unique=True, null=False)  # 유니크한 이메일 필드 혹시 모르니, null=False 설정도 뒀다.
  
  profile_image = models.ImageField(
    "프로필_이미지", upload_to='users/profile', blank=True)
  short_description = models.TextField('소개글', blank=True)
  
  USERNAME_FIELD = 'email'  # 이메일을 사용자 식별자로 설정
  REQUIRED_FIELDS = [] # 필수 입력 값을 정하는 필드 비어있는 지금은 아무것도 없는 상태
  username = None

  objects = CustomUserManager()

