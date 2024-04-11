
### 깃허브액션에서 
 ${HOME} = home/<user>

### docker-compose 사용밥법
docker-compose run --rm web sh -c '장고 명령어'
이걸 사용하면 내 로컬환경에도 변화가 적용되기 때문에 터미널 방식처럼
실행할때마다 쓸 필요없이 필요할때 필요한 부분을 사용하면 된다.
docker-compose run --rm <docker-compose.services_이름> sh -c

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

