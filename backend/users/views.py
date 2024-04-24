from django.contrib.auth.models import User

from django.shortcuts import render, redirect
from users import LoginForm, SignupForm
import environ

import requests
from django.contrib.auth import authenticate, login, logout
from rest_framework.exceptions import (
    NotFound, ValidationError
)
from rest_framework import status, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
)
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken  # 추가: JWT 토큰 관련
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from django.core.mail import send_mail
from backend.users.serializers import (
    UserListSerializer, MypageSerializer, LoginSerializer,
    SignupSerializer, ChangePasswordSerializer
)
from backend.config import NAVER_REST_API_KEY, NAVER_REST_API_SECRET

import string
import random

def login_view(request):
    # 이미 로그인되어 있다면
    if request.user.is_authenticated:
        return redirect('/api/v1/categories/places/')

    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('/api/v1/categories/places/')
            else:
                form.add_error(None, '아이디 또는 비밀번호가 잘못되었습니다.')

        # 어떠한 경우든 실패한 경우(데이터 검증, 사용자 검사) 다시 LoginForm을 사용한 로그인 페이지 렌더링
        context = {
            'form': form,
        }
        return render(request, 'users/login.html', context)

    else:
        form = LoginForm()
        # 생성한 LoginForm 인스턴스를 템플릿에 'form'이라는 키로 전달한다
        context = {
            'form': form,
        }
        return render(request, 'users/login.html', context)

def logout_view(request):
    # Logout 함수 호출에 request를 전달한다
    logout(request)
    # 로그인 페이지로 redirect
    return redirect('/api/v1/users/login/')


def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            user = form.save()
            user.backend = 'django.contrib.auth.backends.ModelBackend'  # backend 설정
            user.save()
            login(request, user)
            return redirect('/api/v1/categories/places/')
    else:
        form = SignupForm()

    context = {
        'form': form,
    }
    return render(request, 'users/signup.html', context)


class UserList(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class JWTRefreshView(TokenRefreshView):
    pass


class JWTLoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class JWTLogoutView(APIView):
    """
    로그아웃 뷰.
    """

    def post(self, request):
        logout(request)
        return Response({"message": "로그아웃 성공"}, status=status.HTTP_200_OK)


class UserDetailList(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound

    def get(self, request, pk):
        user = User.objects.filter(pk=pk)
        user_serializer = UserListSerializer(user, many=True)
        return Response(user_serializer.data, status=HTTP_200_OK)

    def delete(self, request, pk):
        user = User.objects.filter(pk=pk)
        if user:
            user.delete()
            return Response({"message": "삭제되었습니다."}, status=HTTP_204_NO_CONTENT)


class Mypage(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = MypageSerializer(user)
        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "계정이 삭제되었습니다."}, status=HTTP_204_NO_CONTENT)


class NaverSignUp(APIView):
    def get(self, request):
        client_id = NAVER_REST_API_KEY
        redirect_uri = "http://localhost:8000/accounts/naver/login/callback/"
        return Response(
            {
                "message": f"https://nid.naver.com/oauth2.0/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"}
        )


class NaverCallbackView(APIView):
    def get(self, request):
        try:
            code = request.GET.get("code")
            client_id = NAVER_REST_API_KEY
            client_secret = NAVER_REST_API_SECRET
            redirect_uri = "http://localhost:8000/accounts/naver/login/callback/"

            token_request = requests.post(
                "https://nid.naver.com/oauth2.0/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "redirect_uri": redirect_uri,
                    "code": code,
                },
            )

            token_json = token_request.json()

            error = token_json.get("error", None)

            if error is not None:
                return Response({"message": "INVALID_CODE"}, status=HTTP_400_BAD_REQUEST)

            access_token = token_json.get("access_token")
            refresh_token = token_json.get("refresh_token")

            profile_request = requests.get(
                "https://openapi.naver.com/v1/nid/me",
                headers={"Authorization": f"Bearer {access_token}"},
            )

            profile_json = profile_request.json()
            # 네이버 프로필 정보를 이용하여 원하는 작업을 수행하십시오.

        except KeyError:
            return Response({"message": "INVALID_TOKEN"}, status=HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        refresh = RefreshToken.for_user(user)  # 추가: JWT 토큰 생성
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        return Response(
            {
                "user_pk": user.pk,
                "name": user.name,
                "email": user.email,
                "token": {
                    "access": access_token,
                    "refresh": refresh_token,
                },
            }
        )


class Login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if email is None or password is None:
            return Response(
                {"message": "이메일과 비밀번호를 입력해주세요."}, status=HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            serializer = LoginSerializer(user)

            refresh = RefreshToken.for_user(user)  # 추가: JWT 토큰 생성
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # 세션에 토큰 저장
            request.session["access"] = access_token
            request.session["refresh"] = refresh_token

            res = Response(
                {
                    "user_pk": user.pk,
                    "message": "로그인 성공",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=HTTP_200_OK,
            )

            return res
        else:
            return Response({"message": "이메일 또는 비밀번호가 없습니다"})


class Logout(APIView):
    def post(self, request):
        logout(request)
        response = Response({"message": "로그아웃 성공"}, status=HTTP_200_OK)
        request.session.flush()
        return response


class EmailSignUp(APIView):
    def get(self, request):
        return Response({"message": "이름, 이메일, 비밀번호를 입력해주세요."})

    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        if not password or len(password) < 8:
            return Response({"message": "비밀번호를 8자 이상 입력해주세요."}, status=HTTP_400_BAD_REQUEST)

        serializer = SignupSerializer(data=request.data)

        if not name or not email:
            return Response({"message": "정보를 다시 확인하고 입력해주세요."}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"message": "이미 가입된 이메일입니다."}, status=HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            user = serializer.save()
            user.set_password(password)
            user.social_type = "email"
            user.is_active = False  # 사용자는 이메일 인증을 받기 전에는 활성화되지 않음
            user.save()

            # 이메일 인증 메일 보내기
            current_site = request.get_host()
            token = RefreshToken.for_user(user)
            verification_link = f"http://{current_site}/verify/{token}"  # 이메일 인증 링크 생성
            email_subject = "이메일 인증을 완료해주세요."
            email_body = (
                f"안녕하세요, {user.name}님.\n회원가입을 환영합니다.\n이메일 인증을 위해 아래 링크를 클릭해주세요:\n{verification_link}"
            )
            send_mail(
                email_subject,
                email_body,
                None,  # 이메일 보내는 사람의 주소 (설정에서 설정한 것을 사용하거나 None 사용)
                [user.email],
                fail_silently=False,
            )

            return Response(
                {"message": "이메일을 확인하여 회원가입을 완료해주세요."}, status=HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class VerifyEmail(APIView):
    def get(self, request, token):
        try:
            token = RefreshToken(token)
            user = User.objects.get(id=token["email"])

            print(user)

            if not user.is_active:
                user.is_active = True
                user.save()
                return Response({"message": "이메일 인증이 완료되었습니다."}, status=HTTP_200_OK)
            else:
                return Response(
                    {"message": "이미 인증된 이메일입니다."}, status=HTTP_400_BAD_REQUEST
                )
        except (InvalidToken, TokenError):
            return Response({"message": "유효하지 않은 토큰입니다."}, status=HTTP_400_BAD_REQUEST)


class SendVerificationCodeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"message": "해당 이메일로 가입된 사용자가 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        # 인증 코드 생성 (여기에서는 간단히 랜덤한 숫자 6자리로 생성하는 것으로 가정)
        verification_code = ''.join(random.choices(string.digits, k=6))

        # 이메일 보내는 코드 작성
        send_mail(
            '이메일 인증 코드',  # 제목
            f'인증 코드: {verification_code}',  # 본문
            '보내는 사람 이메일 주소',  # 보내는 사람 이메일 주소
            [email],  # 받는 사람 이메일 주소 리스트
            fail_silently=False,  # 실패 시 에러를 무시할지 여부
        )

        return Response({"message": "이메일로 인증 코드가 전송되었습니다."}, status=status.HTTP_200_OK)


class FindPassword(APIView):
    def post(self, request):
        email = request.data.get("email", None)
        if email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"email": "가입되어 있는 이메일이 존재하지 않습니다."}, status=HTTP_404_NOT_FOUND
                )

            # 이메일에서 재설정 URL 생성
            current_site = "127.0.0.1:3000"
            reset_link = "http://" + current_site + "/login/resetpw/" + str(user.pk)
            email_subject = "비밀번호 재설정 메일입니다."
            email_body = (
                    "안녕하세요."
                    + user.name
                    + "님,\n비밀번호를 재설정하기 위한 링크를 보내드립니다.\n아래 링크를 클릭하여 비밀번호를 재설정해주세요.\n"
                    + reset_link
            )

            # 이메일 전송
            send_mail(
                email_subject,
                email_body,
                env("EMAIL_HOST_USER"),
                [user.email],
            )

            return Response(
                {"detail": "비밀번호 재설정 이메일이 발송되었습니다."}, status=HTTP_200_OK
            )
        return Response(
            {"email": "가입된 이메일이 없습니다."},
            status=HTTP_400_BAD_REQUEST,
        )


class ResetPassword(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound

    def post(self, request, pk):
        user = self.get_object(pk)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        check_password = request.data.get('check_password')

        if not user.check_password(old_password):
            raise ValidationError({'detail': '현재 비밀번호가 올바르지 않습니다.'})

        if new_password != check_password:
            raise ValidationError({'detail': '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.'})