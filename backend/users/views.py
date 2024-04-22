from .models import User

# viewsets 사용을 위한 추가
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import LoginSerializer, MypageSerializer,SignupSerializer
# Create your views here.

class LoginViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = LoginSerializer
    
class MyPageViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = MypageSerializer
  
  
class signupViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = SignupSerializer


# Logout은 상호작용이 필요없기때문에 APIView를 이용해 POST로 구현한다.
from rest_framework.views import APIView
from django.contrib.auth import logout


class LogoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
