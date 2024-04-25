## 사용방법
최초 실행시 어드민페이지에서 소셜 어플리케이션 설정을 해줘야지만 오류가 발생하지 않는다

### 깃허브액션에서 
 ${HOME} = home/<user>

### docker-compose 사용밥법
docker-compose run --rm web sh -c '장고 명령어'
이걸 사용하면 내 로컬환경에도 변화가 적용되기 때문에 터미널 방식처럼
실행할때마다 쓸 필요없이 필요할때 필요한 부분을 사용하면 된다.
docker-compose run --rm <docker-compose.services_이름> sh -c

모델에 변경이 있으면 해준다(makemigrations/migrate)
#### 마이그레이션즈
docker-compose run --rm web sh -c 'python manage.py makemigrations'

#### 마이그레이트
docker-compose run --rm web sh -c 'python manage.py migrate'

docker-compose down, 혹은 도커 오류가 있었을떄 해준다(createsuperuser/olace_import)
#### 크리에이트슈퍼유저
docker-compose run --rm web sh -c 'python manage.py createsuperuser'

#### 플레이스임포트
docker-compose run --rm web sh -c 'python manage.py place_import'

#### 캐시 삭제
docker-compose run --rm web sh -c 'python manage.py clearcache'

### 도커 컨테이너 터미널 들어가는 방법
#### 이 방식은 사용할 일이 적겠지만 알아두면 좋으니 적어두겠습니다.
새오룬 터미널 창을 띄운다.

docker exec -it backend-web-1 /bin/sh
<!-- docker exec -it <컨테이너_이름> /bin/sh -->
<!-- ls,pwd 써서 위치 어딘지 파악해보기(생략해도 됨) -->

python manage.py makemirations
<!-- 로컬에서 하고 빌드했다면 생략 가능 -->

python manage.py migrate
<!-- models.py,settings.py 수정이 있을떈 도커컨테이너 터미널로 들어가서 실행해 줘야함 -->
<!-- 도커를 재시작했거나, docker-compose down을 했을떄도 실행 해야함  -->

python manage.py createsuperuser
<!-- 도커를 재시작했거나, docker-compose down을 했다면 실행 해야함  -->

터미널 종료는 exit

### on_delete=models. 옵션들
on_delete=models.SET_NULL, null=True 
이 옵션은 삭제할 데이터가 참조된 데이터는 그 필드를 NULL로 지정한다.

on_delete=models.PROTECT
이 옵션은 삭제할 데이터가 참조된 곳이 있다면 삭제되지 않는다.


### viewsets url 설정

({'get':'list'}): 리소스 목록을 반환합니다. HTTP GET 요청에 대응됩니다.
({'get':'retrieve'}): 특정 리소스의 세부 정보를 반환합니다. HTTP GET 요청에 대응됩니다.
({'post':'create'}): 새로운 리소스를 생성합니다. HTTP POST 요청에 대응됩니다.
({'put':'update'}): 특정 리소스의 정보를 업데이트합니다. HTTP PUT 요청에 대응됩니다.
({'put':'partial_update'}): 특정 리소스의 일부 정보를 업데이트합니다. HTTP PATCH 요청에 대응됩니다.
({'delete':'destroy'}): 특정 리소스를 삭제합니다. HTTP DELETE 요청에 대응됩니다.


### 
http://localhost:8000/api/v1/categories/places?address=대구광역시&number=053
http://localhost:8000/api/v1/categories/places?address=대구광역시

from rest_framework import viewsets
from .models import Place
from .serializers import PlaceSerializer

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        address = self.request.query_params.get('address', None)
        if address:
            queryset = queryset.filter(place_where1__icontains=address)
        return queryset

### 여기에는 SIMPLE_JWT 설정의 각 항목에 대한 설명이 있습니다:

ACCESS_TOKEN_LIFETIME: 액세스 토큰의 수명입니다. 기본값은 30분입니다. (timedelta 객체)
REFRESH_TOKEN_LIFETIME: 리프레시 토큰의 수명입니다. 기본값은 7일입니다. (timedelta 객체)
ROTATE_REFRESH_TOKENS: True로 설정할 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 반환합니다. 기본값은 True입니다.
BLACKLIST_AFTER_ROTATION: True로 설정할 경우, 이전의 리프레시 토큰은 블랙리스트 처리됩니다. 기본값은 True입니다.
UPDATE_LAST_LOGIN: True로 설정할 경우, 사용자 모델의 last_login 필드가 갱신됩니다. 기본값은 True입니다.
ALGORITHM: 토큰에 사용되는 암호화 알고리즘입니다. 기본값은 HS256입니다.
SIGNING_KEY: 토큰을 서명할 때 사용되는 키입니다. 기본값은 SECRET_KEY로 설정됩니다.
VERIFYING_KEY: 토큰을 확인할 때 사용되는 키입니다. 기본값은 None이며, 필요한 경우 설정해야 합니다.
AUDIENCE: 토큰의 대상(aud) 클레임의 값을 지정합니다. 기본값은 None입니다.
ISSUER: 토큰의 발급자(iss) 클레임의 값을 지정합니다. 기본값은 None입니다.
JWK_URL: JSON 웹 키 URL을 지정합니다. 기본값은 None입니다.
LEEWAY: 토큰 유효성 검사 시의 여유 시간입니다. 기본값은 0입니다.
AUTH_HEADER_TYPES: 인증 헤더의 유형을 지정합니다. 기본값은 ("Bearer",)입니다.
AUTH_HEADER_NAME: 인증 헤더의 이름을 지정합니다. 기본값은 "HTTP_AUTHORIZATION"입니다.
USER_ID_FIELD: 토큰의 사용자 ID 클레임에 사용되는 사용자 모델의 필드입니다. 기본값은 "id"입니다.
USER_ID_CLAIM: 토큰의 사용자 ID 클레임의 이름입니다. 기본값은 "user_id"입니다.
USER_AUTHENTICATION_RULE: 사용자 인증 규칙을 지정하는 함수입니다. 기본값은 default_user_authentication_rule입니다.
AUTH_TOKEN_CLASSES: 인증 토큰의 클래스를 지정합니다. 기본값은 (AccessToken,)입니다.
TOKEN_TYPE_CLAIM: 토큰의 유형을 지정하는 클레임의 이름입니다. 기본값은 "token_type"입니다.
TOKEN_USER_CLASS: 토큰과 관련된 사용자 모델의 클래스입니다. 기본값은 "rest_framework_simplejwt.models.TokenUser"입니다.
JTI_CLAIM: 토큰의 JTI 클레임의 이름입니다. 기본값은 "jti"입니다.
SLIDING_TOKEN_REFRESH_EXP_CLAIM: 슬라이딩 리프레시 토큰의 만료 클레임의 이름입니다. 기본값은 "refresh_exp"입니다.
SLIDING_TOKEN_LIFETIME: 슬라이딩 토큰의 수명입니다. 기본값은 5분입니다. (timedelta 객체)
SLIDING_TOKEN_REFRESH_LIFETIME: 슬라이딩 리프레시 토큰의 수명입니다. 기본값은 1일입니다. (timedelta 객체)