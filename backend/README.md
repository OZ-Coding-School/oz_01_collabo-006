## ${HOME} = home/<user>

### 도커 컨테이너 터미널 들어가는 방법
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



