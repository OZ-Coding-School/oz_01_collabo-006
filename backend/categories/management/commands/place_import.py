import csv
from django.core.management.base import BaseCommand
from categories.models import Place  # 임포트할 모델을 임포트하세요

class Command(BaseCommand):
    help = 'Import place data from CSV'

    def handle(self, *args, **kwargs):
        csv_file = 'categories/management/commands/place_data3.csv'  # CSV 파일 경로를 정확히 지정하세요

        # CSV 파일을 읽고 데이터베이스에 저장합니다
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                place = Place.objects.create(
                    Place_Name=row['시설명'],
                    Category1=row['카테고리1'],
                    Category2=row['카테고리3'],
                    Latitude=row['위도'],
                    Longitude=row['경도'],
                    Province=row['시도 명칭'],
                    City=row['시군구 명칭'],
                    Postal_Code=row['우편번호'],
                    place_where1=row['도로명주소'],
                    place_where2=row['지번주소'],
                    Number=row['전화번호'],
                    Home_Page=row['홈페이지'],
                    Off_Day=row['휴무일'],
                    Opening_hours=row['운영시간'],
                    Parking=row['주차 가능여부'],
                    Entrance_Fee=row['입장(이용료)가격 정보'],
                    Dog_Size=row['입장 가능 동물 크기'],
                    Restrictions=row['반려동물 제한사항'],
                    Location_Description=row['기본 정보_장소설명'],
                    Extra_Fee=row['애견 동반 추가 요금']
                )

        self.stdout.write(self.style.SUCCESS('Place data imported successfully'))
