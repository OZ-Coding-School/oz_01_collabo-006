from django.shortcuts import render, redirect

# Create your views here.
def places(request):
  # # 요청(request)으로부터 사용자 정보를 가져온다.
  # user = request.user
  
  # # 가져온 사용자가 '로그인 했는지' 여부를 가져온다
  # is_authenticated = user.is_authenticated
  
  # print('user:',user)
  # print('is_authenticated:',is_authenticated)
  
  #요청에 포함된 사용자가 로그인하지 않은 경우(AnonymousUser 인 경우)
  if not request.user.is_authenticated:
    return redirect(request, 'api/v1/users/login/')
  
  return render(request, 'categories/places.html')