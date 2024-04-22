
from django.contrib import admin
from django.urls import path, include
from users import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # 토큰 발급
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # 토큰 갱신
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # 토큰 유효한지 확인
    path("verify/<str:token>", views.VerifyEmail.as_view()),  # 이메일 인증

    path('auth/naver/callback', views.NaverCallbackView.as_view(), name='naver_callback'),  # 네이버 콜백
    path("api/users/", include("users.urls")),

    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]