from django.shortcuts import render, redirect
from users.forms import LoginForm, SignupForm
from django.contrib.auth import authenticate, login, logout
from users.models import User

# Create your views here.
def login_view(request):
    # 이미 로그인되어 있다면
    if request.user.is_authenticated:
        return redirect('/categories/places/')
    
    if request.method=='POST':
        # LoginForm 인스턴스 생성하며, 입력 데이터는 request.POST를 사용
        form = LoginForm(data=request.POST)
        
        # LoginForm에 들어온 데이터가 적절한지 유효성 검사
        # print('form.is_valid():', form.is_valid())

        # # 유효성 검사 이후에는 cleaned_data에서 데이터를 가져와 사용
        # print('form.cleaned_data:', form.cleaned_data)
        # context = {
        #     'form': form
        # }
        # return render(request, 'users/login.html', context)
        
        # LoginForm에 전달된 데이터가 유효하다면
        if form.is_valid():
            # username과 password를 가져온다
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            
            # email과 password를 가진 사용자가 있는지 검사한다
            user = authenticate(email=email, password=password)
            
            # email과 password를 가진 사용자가 있다면
            if user is not None:
                login(request, user)
                return redirect('/categories/places/')
            
            # email과 password를 가진 사용자가 없다면
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
        return render(request,'users/login.html', context)

def logout_view(request):
    # Logout 함수 호출에 request를 전달한다
    logout(request)
    # 로그아웃 페이지로 redirect
    return redirect('/users/login/')

def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(data=request.POST,files=request.FILES)
        # Form 에 에러가 없다면, 곧바로 User 를 생성학고 로그인 후 플레이스 페이지로 이동한다
        if form.is_valid():
            user = form.save()
            # email = form.cleaned_data['email']
            # password = form.cleaned_data['password']
            # password2 = form.cleaned_data['password2']
            # profile_image = form.cleaned_data['profile_image']
            # short_description = form.cleaned_data['short_description']
            # user = User.objects.create_user(
            #     email=email,
            #     password=password,
            #     profile_image=profile_image,
            #     short_description=short_description,
            # )
            login(request, user)
            return redirect('/categories/places/')
        
        # Form에 에러가 있다면, 에러를 포함한 Form을 사용해 회원가입 페잊를 보여준다  
    else:
        form = SignupForm()
            
    context = {
        'form': form,
    }
    return render(request,'users/signup.html', context)
        
            # # 검증 로직은 Form으로 옮겼으니 여기는 지워주면 된다.(리팩터링) 
            # # 비밀번호와 비밀번호 확인 값이 같은지 검사
            # if password != password2:
            #     form.add_error('password2', '비밀번호 확인 값이 일치하지 않습니다.')
            # # email을 사용중인 유저가 이미 있는지 검사
            # if User.objects.filter(email=email).exists():
            #     form.add_error('email', '이미 사용중인 이메일입니다.')
            # 에러가 존재한다면, 에러를 포함한 form을 사용해 회원가입 페이지 다시 렌더링
            # if form.errors:
            #     context = {
            #         'form': form,
            #     }
            #     return render(request,'users/signup.html', context)
            # # 에러가 없다면, 사용자를 생성하고 로그인 처리 후 플레이스 페이지로 이동
            # else:
            #     user = User.objects.create_user(
            #         email=email,
            #         password=password,
            #         profile_image=profile_image,
            #         short_description=short_description,
            #     )
            #     login(request, user)
            #     return redirect('/categories/places/')
    # GET 요청에서는 빈 Form을 보여준다
    # else:
    #     # SignupForm 인스턴스를 생성, Template에 전달한다    
    #     form = SignupForm()
    #     context = {
    #         'form': form,
    #     }
    #     return render(request,'users/signup.html', context)