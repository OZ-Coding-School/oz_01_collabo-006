from django.urls import path, include
from users.form_views import login_view, logout_view, signup_view
from users.views import LoginViewSet, MyPageViewSet, signupViewSet, LogoutAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'mypage', MyPageViewSet, basename='mypage')
router.register(r'signup', signupViewSet, basename='signup')
urlpatterns = [
    *router.urls,
    path('logout/', LogoutAPIView.as_view(), name='logout')
]


# urlpatterns = [
#     path('login/',),
#     # path('login/', login_view, name='login'),
#     # path('logout/', logout_view, name='logout'),
#     # path('signup/', signup_view, name='signup'),
# ]