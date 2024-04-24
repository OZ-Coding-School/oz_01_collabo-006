from django.urls import path, include
from users.form_views import login_view, logout_view, signup_view
from users.views import MyPageViewSet, SignupAPIView, CustomTokenObtainPairView, CustomLogoutView, ChangePasswordAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'mypage', MyPageViewSet, basename='mypage')

urlpatterns = [
    *router.urls,
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('signup/', SignupAPIView.as_view(), name='signup'),
    path('password/', ChangePasswordAPIView.as_view(), name='password'),
]


# urlpatterns = [
#     path('login/',),
#     # path('login/', login_view, name='login'),
#     # path('logout/', logout_view, name='logout'),
#     # path('signup/', signup_view, name='signup'),
# ]