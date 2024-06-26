from django.db import models
from common.models import CommonModel

# Create your models here.
class Review(CommonModel):
  id = models.AutoField(primary_key=True)
  # rating = models.IntegerField(null=False)
  place = models.ForeignKey('categories.Place', on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.CASCADE)
  content = models.TextField(null=False)
  
  def __str__(self):
    return f"{self.user.email}님의 리뷰입니다."
  
  