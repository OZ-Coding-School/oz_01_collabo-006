# config/apps.py

from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'config'

    def ready(self):
        # Django 앱이 로드된 후에 실행될 코드를 여기에 추가하세요
        from rest_framework_simplejwt.authentication import default_user_authentication_rule
