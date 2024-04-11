from django.shortcuts import render, redirect

def index(request):
    # 로그인되어 있는 경우, 플레이스 페이지로 redirect
    if request.user.is_authenticated:
        return redirect('/categories/places/')
    # 로그인되어 있지 않은 경우, 로그인 페이지로 redirect
    else:
        return redirect('/users/login/')
    
    # return render(request,'index.html')
    # 기본 인덱스 페이지는 사용되지 않는다.