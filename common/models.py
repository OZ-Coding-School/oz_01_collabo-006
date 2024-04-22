from django.db import models

# Create your models here.
class CommonModel(models.Model):
  # auto_now_add : 현제 데이터 생성 시간에 맞춰 생성 됨 >> 이후 데이터가 업데이트 돼도 수정되지않음
  created_at = models.DateTimeField(auto_now_add=True)
  
  # auto_now : 생성되는 시간에 맞춰 생성 됨 >> 업데이트 되면 업데이트 시간에 맞춰 수정 됨
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True # 데이터베이스의 테이블에 위와 같은 컬럼이 추가되지 않습니다.
