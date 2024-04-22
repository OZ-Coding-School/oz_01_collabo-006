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
from django.contrib import admin
from django.urls import path, include
from users import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path
from backend.config import index

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/categories/', include('categories.urls')),
    path('api/v1/accounts/', include('social.urls')),
    path('',index,name='home'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # 토큰 발급
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # 토큰 갱신
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # 토큰 유효한지 확인
    path("verify/<str:token>", views.VerifyEmail.as_view()),  # 이메일 인증
    path('auth/naver/callback', views.NaverCallbackView.as_view(), name='naver_callback'),  # 네이버 콜백
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

# 정적 파일 제공을 위한 static() 함수 사용
urlpatterns += static(
    # URL의 접두어가 MEDIA_URL일 때는 정적 파일을 돌려줍니다.
    prefix=settings.MEDIA_URL,
    # 돌려줄 디렉터리는 MEDIA_ROOT를 기준으로 합니다.
    document_root=settings.MEDIA_ROOT
)
