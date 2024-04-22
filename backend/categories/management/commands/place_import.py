import csv
from django.core.management.base import BaseCommand
from categories.models import Place  # 임포트할 모델을 임포트하세요

class Command(BaseCommand):
    help = 'Import place data from CSV'

    def handle(self, *args, **kwargs):
        csv_file = 'categories/management/commands/place_data.csv'  # CSV 파일 경로를 정확히 지정하세요

        # CSV 파일을 읽고 데이터베이스에 저장합니다
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                place = Place.objects.create(
                    Place_Name=row['Place_Name'],
                    Category1=row['Category1'],
                    Category2=row['Category2'],
                    Latitude=row['Latitude'],
                    Longitude=row['Longitude'],
                    Postal_Code=row['Postal_Code'],
                    place_where1=row['place_where1'],
                    place_where2=row['place_where2'],
                    Number=row['Number'],
                    Home_Page=row['Home_Page'],
                    Off_Day=row['Off_Day'],
                    Opening_hours=row['Opening_hours'],
                    Parking=row['Parking'],
                    Entrance_Fee=row['Entrance_Fee'],
                    Dog_Size=row['Dog_Size'],
                    Restrictions=row['Restrictions'],
                    Location_Description=row['Location_Description'],
                    Extra_Fee=row['Extra_Fee']
                )

        self.stdout.write(self.style.SUCCESS('Place data imported successfully'))
