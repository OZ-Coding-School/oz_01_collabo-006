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
