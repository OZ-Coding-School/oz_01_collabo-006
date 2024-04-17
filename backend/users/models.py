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
    "프로필_이미지", upload_to='users/profile', blank=True
  )
  short_description = models.TextField('소개글', blank=True)
  
  USERNAME_FIELD = 'email'  # 이메일을 사용자 식별자로 설정
  EMAIL_FIELD = 'email'
  REQUIRED_FIELDS = [] # 필수 입력 값을 정하는 필드 비어있는 지금은 아무것도 없는 상태
  username = None

  dogs_size = models.ForeignKey('Dog', on_delete=models.SET_NULL, null=True,blank=True)
  
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
