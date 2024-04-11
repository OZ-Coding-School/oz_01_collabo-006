from django import forms
from django.core.exceptions import ValidationError
from users.models import User

class LoginForm(forms.Form):
  email= forms.EmailField(
    widget=forms.EmailInput(
      attrs={'placeholder': '이메일을 입력해주세요'},
      ),
  )
  password= forms.CharField(
    widget=forms.PasswordInput(
      attrs={'placeholder': '8 자리 이상입니다.'},
      ),
    )
  
class SignupForm(forms.Form):
  email= forms.EmailField(
    widget=forms.EmailInput(
      attrs={'placeholder': '이메일을 입력해주세요'},
      ),
  )
  password= forms.CharField(
    widget=forms.PasswordInput(
      attrs={'placeholder': '8 자리 이상입니다.'},
      ),
    )
  password2= forms.CharField(
    widget=forms.PasswordInput(
      attrs={'placeholder': '비밀번호 확인'},
      ),
    )
  profile_image = forms.ImageField()
  
  short_description = forms.CharField(
    widget=forms.TextInput(
      attrs={'placeholder': '소개글을 입력해주세요.'},
      ),
    )
  
  def clean_email(self):
    email = self.cleaned_data['email']
    if User.objects.filter(email=email).exists():
      raise ValidationError('이미 사용중인 이메일입니다.')
    return email
  
  def clean(self):
    password = self.cleaned_data['password'] 
    password2 = self.cleaned_data['password2'] 
    if password != password2:
      # password2 필드에 오류를 추가
      raise ValidationError('password2','비밀번호 확인 값이 일치하지 않습니다.')
  
  def save(self):
    email = self.cleaned_data['email']
    password = self.cleaned_data['password']
    password2 = self.cleaned_data['password2']
    profile_image = self.cleaned_data['profile_image']
    short_description = self.cleaned_data['short_description']
    user = User.objects.create_user(
        email=email,
        password=password,
        profile_image=profile_image,
        short_description=short_description,
    )
    return user