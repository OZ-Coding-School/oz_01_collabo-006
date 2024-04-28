"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path ,include
from config.views import index
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers

router = routers.DefaultRouter()

schema_view = get_schema_view(
    openapi.Info(
        title="Your API Documentation",
        default_version="v1",
        description="API for your project",
    ),
    public=True,
)


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/categories/', include('categories.urls')),
    path('api/v1/accounts/', include('social.urls')),
    path('api/v1/reviews/', include('reviews.urls')),
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('',index,name='home'),
] + static(
  # URL의 접두어가 MEDIA_URL일 떄는 정적파일을 돌려준다.
  prefix=settings.MEDIA_URL,
  # 돌려줄 디렉터리는 MEDIA_ROOT를 기준으로 한다.
  document_root=settings.MEDIA_ROOT
)
