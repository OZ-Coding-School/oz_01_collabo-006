from .models import User

# viewsets 사용을 위한 추가
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import MypageSerializer, SignupSerializer, ChangePasswordSerializer
# Create your views here.

# 장고의 login 기능을 사용해야 해서 뷰셋은 사용하지 않는다
# class LoginViewSet(viewsets.ModelViewSet):
#   queryset = User.objects.all()
#   serializer_class = LoginSerializer
  
#   def list(self, request):
#         # Implement login logic here
#         return Response({"message": "Login successful"})
    
#     # Pass other methods
#   def create(self, request):
#       pass

#   def retrieve(self, request, pk=None):
#       pass

#   def update(self, request, pk=None):
#       pass

#   def partial_update(self, request, pk=None):
#       pass

#   def destroy(self, request, pk=None):
#       pass
  
  
class MyPageViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = MypageSerializer

  def list(self, request):
    pass

  def create(self, request):
    pass

  # def retrieve(self, request, pk=None):
    # pass

  # def update(self, request, pk=None):
    # pass

  # def partial_update(self, request, pk=None):
    # pass

  # def destroy(self, request, pk=None):
    # pass


# Logout은 상호작용이 필요없기때문에 APIView를 이용해 POST로 구현한다.
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # 이메일로 사용자 확인
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # 비밀번호 인증
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return super().post(request, *args, **kwargs)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)



# class LoginAPIView(APIView):
#   def post(self, request, *args, **kwargs):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     user = authenticate(request, email=email, password=password)
  
#     try:
#       user = User.objects.get(email=email)
#     except User.DoesNotExist:
#       return Response({"message": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # 비밀번호 인증
#     user = authenticate(request, email=email, password=password)
#     if user is not None:
#       login(request, user)
#       return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
#     else:
#       return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

class CustomLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)

# class LogoutAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         logout(request)
#         return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)

class SignupAPIView(APIView):
    def post(self, request, format=None):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class ChangePasswordAPIView(APIView):
  def put(self, request, *args, **kwargs):
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
      user = request.user
      new_password = serializer.validated_data['new_password']
      user.set_password(new_password)
      user.save()
      return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)