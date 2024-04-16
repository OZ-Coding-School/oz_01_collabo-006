# Generated by Django 5.0.3 on 2024-04-16 08:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_profile_image_user_short_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sizes', models.CharField(max_length=25, verbose_name='견종사이즈')),
                ('min_weight', models.IntegerField(blank=True, verbose_name='최소 무게')),
                ('max_weight', models.IntegerField(blank=True, verbose_name='최대 무게')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='dogs_size',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.dogs'),
        ),
    ]
