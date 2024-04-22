from django import forms
from django.core.exceptions import ValidationError
from users import User,Dog

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
    label='이메일'
  )
  password= forms.CharField(
    widget=forms.PasswordInput(
      attrs={'placeholder': '8 자리 이상입니다.'},
      ),
    label='비밀번호'
    )
  confirm_password = forms.CharField(
    widget=forms.PasswordInput(
      attrs={'placeholder': '비밀번호 확인'}),
    label='비밀번호 확인'
    )
  # password2= forms.CharField(
  #   widget=forms.PasswordInput(
  #     attrs={'placeholder': '비밀번호 확인'},
  #     ),
  #   )
  profile_image = forms.ImageField(
    
    label='프로필 사진'
  )
  
  short_description = forms.CharField(
    widget=forms.TextInput(
      attrs={'placeholder': '소개글을 입력해주세요.'},
      ),
    label='자기소개'
    )

  # DOGS_SIZES = (
  #     ('소형견', '소형견'),
  #     ('중형견', '중형견'),
  #     ('대형견', '대형견'),
  #     ('맹견', '맹견'),
      
  # )

  # dogs_size = forms.ChoiceField(
  #   choices=DOGS_SIZES,
  #   widget=forms.Select(
  #       attrs={'placeholder': '견종 크기를 선택해주세요.'},
  #   ),
  # )
  dogs_size = forms.ModelChoiceField(
    queryset=Dog.objects.all(),
    empty_label=None,
    widget=forms.Select(
        attrs={'placeholder': '견종 크기를 선택해주세요.'},
    ),
    label='견종 분류'
)
    # class UserCreationForm(forms.ModelForm):

  def clean_email(self):
    email = self.cleaned_data['email']
    if User.objects.filter(email=email).exists():
      raise ValidationError('이미 사용중인 이메일입니다.')
    return email
  
  # def clean(self):
  #   password = self.cleaned_data['password'] 
  #   password2 = self.cleaned_data['password2'] 
  #   if password != password2:
  #     # password2 필드에 오류를 추가
  #     raise ValidationError('password2','비밀번호 확인 값이 일치하지 않습니다.')
  
  def clean(self):
    cleaned_data = super().clean()
    password = cleaned_data.get('password')
    confirm_password = cleaned_data.get('confirm_password')

    if password and confirm_password and password != confirm_password:
      raise ValidationError('비밀번호 확인 값이 일치하지 않습니다.')
  
  def save(self):
    email = self.cleaned_data['email']
    password = self.cleaned_data['password']
    # password2 = self.cleaned_data['password2']
    profile_image = self.cleaned_data['profile_image']
    short_description = self.cleaned_data['short_description']
    dogs_size = self.cleaned_data['dogs_size']
    
    user = User.objects.create_user(
        email=email,
        password=password,
        profile_image=profile_image,
        short_description=short_description,
        dogs_size=dogs_size,
    )
    return user


      