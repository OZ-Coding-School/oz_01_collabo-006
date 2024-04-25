from django.db import models
from common.models import CommonModel
# Create your models here.
class Place(CommonModel):
  id = models.AutoField(primary_key=True)
  
  # 시설명
  Place_Name = models.CharField(max_length=255)
  
  # 카테고리1
  Category1 = models.CharField(max_length=255, null=True, blank=True)
  
  # 카테고리2
  Category2 = models.CharField(max_length=255, null=True, blank=True)
  
  # 위도
  Latitude = models.CharField(max_length=255, null=True, blank=True)
  
  # 경도
  Longitude = models.CharField(max_length=255, null=True, blank=True)
  
  # 우편번호
  Postal_Code = models.CharField(max_length=50, null=True, blank=True)
  
  # 시설지번주소
  place_where1 = models.CharField(max_length=255, null=True, blank=True)
  
  # 시설도로명주소
  place_where2 = models.CharField(max_length=255, null=True, blank=True)
  
  # 전화번호
  Number = models.CharField(max_length=50, null=True, blank=True)
  
  # 홈페이지
  Home_Page = models.TextField( null=True, blank=True)
  
  # 휴무일
  Off_Day = models.CharField(max_length=255, null=True, blank=True)
  
  # 운영시간
  Opening_hours = models.CharField(max_length=255, null=True, blank=True)
  
  # 주차가능여부
  Parking = models.CharField(max_length=255, null=True, blank=True)
  
  # 입장(이용료)가격 정보
  Entrance_Fee = models.TextField( null=True, blank=True)
  
  # 반려동물 동반 가능정보
  Dog_Size = models.TextField(null=True, blank=True)
  
  # 반려동물 제한사항
  Restrictions =models.TextField(null=True, blank=True)
  
  # 기본 정보_장소설명
  Location_Description = models.TextField(null=True, blank=True)
  
  # 애견 동반 추가 요금
  Extra_Fee = models.TextField(null=True, blank=True)

  # 오시는길
  how_to_go = models.TextField(null=True, blank=True)

  # # 시설사진
  # place_img = models.ImageField(
  #     "시설_이미지", upload_to='place/', blank=True, null=True
  # )

  # 하고싶은말
  place_comment = models.TextField(null=True, blank=True)

  # 시설소개
  place_production = models.TextField(null=True, blank=True)

  # 리뷰댓글
  # review_manage = models.ForeignKey('reviews.Review',on_delete=models.CASCADE)
  
  def __str__(self):
    return self.Place_Name
  
  def place_images(self):
    return self.place_images.all()

  
  # 리뷰 역참조 필드 추가
  @property
  def reviews(self):
    return self.review_manage.all()
  
  
  # class Meta:
  #   app_label = 'categories'
    
class place_Images(models.Model):
  # place
  place = models.ForeignKey('Place', verbose_name='시설 사진', on_delete=models.CASCADE)
  # 시설사진
  place_img = models.ImageField(
      "시설_이미지", upload_to='place/', blank=True, null=True
  )
  
  # class Meta:
  #   app_label = 'categories'