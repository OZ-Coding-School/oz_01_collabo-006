from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.contrib import admin
from django.urls import path, include
from config.views import index
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import routers
from users import views
from django.urls import re_path
from backend.config import index
from rest_framework import permissions

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = routers.DefaultRouter()

schema_view = get_schema_view(
    openapi.Info(
        title="Your API Documentation",
        default_version="v1",
        description="API for your project",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='home'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # 토큰 발급
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # 토큰 갱신
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # 토큰 유효한지 확인
    path("verify/<str:token>", views.VerifyEmail.as_view()),  # 이메일 인증
    path('auth/naver/callback', views.NaverCallbackView.as_view(), name='naver_callback'),  # 네이버 콜백
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/categories/', include('categories.urls')),
    path('api/v1/accounts/', include('social.urls')),
    path('api/v1/reviews/', include('reviews.urls')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('',index,name='home'),
] + static(
  # URL의 접두어가 MEDIA_URL일 떄는 정적파일을 돌려준다.
  prefix=settings.MEDIA_URL,
  # 돌려줄 디렉터리는 MEDIA_ROOT를 기준으로 한다.
  document_root=settings.MEDIA_ROOT
)