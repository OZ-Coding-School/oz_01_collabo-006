
물론이죠! mongoengine을 사용하여 MongoDB와 상호작용하는 방법을 간단히 알려드리겠습니다.

먼저, mongoengine 라이브러리를 설치합니다.

Copy code
pip install mongoengine
MongoDB와의 연결을 설정하고 mongoengine을 초기화합니다. Django의 settings.py 파일이 아닌 프로젝트의 어디서든 이 작업을 수행할 수 있습니다.


import mongoengine

# MongoDB와의 연결 설정
mongoengine.connect(
    db='mydatabase',  # MongoDB 데이터베이스 이름
    host='localhost',  # MongoDB 호스트
    port=27017,        # MongoDB 포트
    # username='username', # MongoDB 사용자 이름 (선택 사항)
    # password='password', # MongoDB 비밀번호 (선택 사항)
)
MongoDB에서 사용할 모델을 정의합니다. Django의 모델과 비슷한 구문을 사용하여 모델을 정의할 수 있습니다.


import mongoengine

class Post(mongoengine.Document):
    title = mongoengine.StringField(required=True)
    content = mongoengine.StringField()
정의한 모델을 사용하여 MongoDB와 상호작용합니다. 이제 Django의 ORM을 사용하는 것과 유사한 방식으로 데이터를 조회, 추가, 수정, 삭제할 수 있습니다.


# 데이터 추가
post = Post(title="First Post", content="Content of first post")
post.save()

# 데이터 조회
all_posts = Post.objects()
for post in all_posts:
    print(post.title)

# 데이터 수정
post = Post.objects(title="First Post").first()
post.content = "Updated content"
post.save()

# 데이터 삭제
post = Post.objects(title="First Post").first()
post.delete()