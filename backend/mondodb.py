import pymongo

# MongoDB에 연결
client = pymongo.MongoClient("mongodb://localhost:27017/")

# 데이터베이스 선택
db = client["mydatabase"]

# 컬렉션 선택 (컬렉션은 테이블과 유사)
collection1 = db["myung"]
collection2 = db["hwan"]

# 새로운 문서 생성
mydata = {"name": "Jeon", "add": "seoul 32"}

# # 컬렉션에 문서 추가
# collection.insert_one(mydata)

# 모든 문서 가져오기
# for x in collection.find():
#     print(x)

# 특정 조건을 만족하는 문서 가져오기
# query = {"address": "Highway 37"}
# result = collection.find(query)

# for x in result:
#     print(x)

# # 특정 문서 업데이트
# query = { "add": "seoul 32"}
# new_values = {"$set": {"add": "Park Lane 38"}}
# collection.update_one(query, new_values)

# # 특정 조건을 만족하는 문서 삭제
# query = {"address": "Park Lane 38"}
# collection.delete_one(query)

# class User:
#     def __init__(self, name, email, age):
#         self.name = name
#         self.email = email
#         self.age = age

# new_user = User("Jon", "john@example.com", None)
# collection.insert_one(new_user.__dict__)

# class User:
#     def __init__(self, name, email, age=None):
#         self.name = name
#         self.email = email
#         self.age = age

# new_user = User("John", "john@example.com", age=None)
# collection.insert_one(new_user.__dict__)

# class User:
#     def __init__(self, name, email, age):
#         self.name = name
#         self.email = email
#         self.age = age

# new_user = User("John", "john@example.com", age=None)
# collection.insert_one(new_user.__dict__)

# class Post:
#     def __init__(self, title, content):
#         self.title = title
#         self.content = content

# class User:
#     def __init__(self, name, email):
#         self.name = name
#         self.email = email
#         self.posts = []

#     def add_post(self, post):
#         self.posts.append(post.__dict__)  # Post 객체를 dict로 변환하여 저장

# post1 = Post("First Post", "Content of first post")
# post2 = Post("Second Post", "Content of second post")
# posts = (post1, post2)

# user = User("John", "john@example.com")
# user.add_post(post1)
# user.add_post(post2)

# collection1.insert_one(user.__dict__)
# collection2.insert_one(posts.__dict__)

