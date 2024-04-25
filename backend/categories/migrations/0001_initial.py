# Generated by Django 5.0.3 on 2024-04-25 15:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('Place_Name', models.CharField(max_length=255)),
                ('Category1', models.CharField(blank=True, max_length=255, null=True)),
                ('Category2', models.CharField(blank=True, max_length=255, null=True)),
                ('Latitude', models.CharField(blank=True, max_length=255, null=True)),
                ('Longitude', models.CharField(blank=True, max_length=255, null=True)),
                ('Postal_Code', models.CharField(blank=True, max_length=50, null=True)),
                ('place_where1', models.CharField(blank=True, max_length=255, null=True)),
                ('place_where2', models.CharField(blank=True, max_length=255, null=True)),
                ('Number', models.CharField(blank=True, max_length=50, null=True)),
                ('Home_Page', models.TextField(blank=True, null=True)),
                ('Off_Day', models.CharField(blank=True, max_length=255, null=True)),
                ('Opening_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('Parking', models.CharField(blank=True, max_length=255, null=True)),
                ('Entrance_Fee', models.TextField(blank=True, null=True)),
                ('Dog_Size', models.TextField(blank=True, null=True)),
                ('Restrictions', models.TextField(blank=True, null=True)),
                ('Location_Description', models.TextField(blank=True, null=True)),
                ('Extra_Fee', models.TextField(blank=True, null=True)),
                ('how_to_go', models.TextField(blank=True, null=True)),
                ('place_comment', models.TextField(blank=True, null=True)),
                ('place_production', models.TextField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='place_Images',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place_img', models.ImageField(blank=True, null=True, upload_to='place/', verbose_name='시설_이미지')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.place', verbose_name='시설 사진')),
            ],
        ),
    ]