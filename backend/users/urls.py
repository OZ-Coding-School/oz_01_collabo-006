from django.urls import path, include
from users.form_views import login_view, logout_view, signup_view
from users.views import MyPageViewSet, SignupAPIView, LogoutAPIView, LoginAPIView, ChangePasswordAPIView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView
from users import views

router = DefaultRouter()
router.register(r'mypage', MyPageViewSet, basename='mypage')

urlpatterns = [
    *router.urls,
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('password/', ChangePasswordAPIView.as_view(), name='password'),
    path("login/", views.JWTLoginView.as_view(), name="jwt_login"),
    path("logout/", views.JWTLogoutView.as_view(), name="jwt_logout"),
    path("simple/jwt_refresh_token", views.JWTRefreshView.as_view(), name="refresh_token"),
    path("simple/jwt_verify_token", TokenVerifyView.as_view(), name="token_verify"),
    path("emailsignup/", views.EmailSignUp.as_view(), name="emailsignup"),
    path("info/", views.UserDetailList.as_view(), name="user_detail"),
    path("email_verify/send/verify_code/", views.SendVerificationCodeView.as_view(), name="send_verify_code"),
    path("email_verify/", views.VerifyEmail.as_view(), name="email_verify"),
]
# urlpatterns = [
#     path('login/',),
#     # path('login/', login_view, name='login'),
#     # path('logout/', logout_view, name='logout'),
#     # path('signup/', signup_view, name='signup'),
# ]