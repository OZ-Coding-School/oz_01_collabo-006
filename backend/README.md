## poetry 기본 사용법
1. poetry init: poetry 기본설정을 정함, 우리는 이미 했음
  [tool.poetry]
  name = "oz06"
  version = "0.1.0"
  description = ""
  authors = ["oz-01-06"]
  readme = "README.md"

2. poetry shell: 가상환경에 들어감

3. poetry add <package name>: 패키지 설치

4. poetry remove <package name>: 패키지 삭제 

5. poetry run python manage.py runserver: python manage.py runserver
  poetry run python manage.py runserver 명령을 사용하여 Django 서버를 실행하면, 프로젝트의 가상 환경 내에서 Django가 실행됩니다. 이렇게 함으로써 프로젝트에 정확한 의존성을 사용하여 일관된 개발 환경을 유지할 수 있습니다.

  반면에 python manage.py runserver를 사용하면 시스템 전역 Python 환경에서 Django를 실행하게 됩니다. 이는 프로젝트의 의존성을 관리하지 않고, 시스템 전체에서 실행되는 Python 버전 및 패키지를 사용하게 됩니다. 이는 다른 프로젝트나 환경에서 발생할 수 있는 충돌이나 버전 관리의 어려움을 야기할 수 있습니다.

## 처음 git push 할때 github에 브랜치가 없을경우 push하는 명령어
#### 브랜치를 원격저장소에 생성해서 푸쉬해준다
git push --set-upstream origin <branch name>


## 사용할 소셜 로그인 모듈
django-allauth: 이 모듈은 다양한 소셜 로그인 공급자(Google, Facebook, Twitter 등)를 지원하며, 소셜 로그인 및 회원가입을 쉽게 구현할 수 있도록 도와줍니다. 사용자 관리, 비밀번호 재설정 및 이메일 확인 등의 기능도 제공합니다.

## 그 외 소셜 로그인 사용법
django-social-auth: 이 모듈도 다양한 소셜 로그인 공급자를 지원합니다. 사용자가 소셜 미디어 계정을 사용하여 로그인할 수 있도록 해줍니다.

이외에도 각 소셜 미디어 플랫폼은 자체적으로 OAuth 또는 OpenID Connect와 같은 프로토콜을 제공합니다. 따라서 소셜 로그인을 구현할 때는 해당 플랫폼의 API를 사용하는 것도 가능합니다.

어떤 모듈을 선택할지는 프로젝트의 요구사항과 개발자의 선호도에 따라 다를 수 있습니다. 하지만 대부분의 경우, django-allauth가 포괄적이고 사용하기 쉬운 옵션으로 알려져 있습니다.

## 모델에 이미지 필드사용을 위한 패키지 설치
poetry add Pillow
