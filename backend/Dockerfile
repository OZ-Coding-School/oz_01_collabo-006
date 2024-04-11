# 베이스 이미지로 사용할 Python 이미지를 선택합니다.
FROM python:3.12

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# 프로젝트 의존성을 설치하기 위해 Poetry를 설치합니다.
# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        postgresql-client \
        libpq-dev \
        # 추가: psycopg2를 빌드하기 위한 라이브러리
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리를 설정합니다.
WORKDIR /app
    
# Install Poetry
# RUN pip install poetry
# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/usr/local/python-poetry python -

# Add Poetry to PATH
ENV PATH="${PATH}:/usr/local/python-poetry/bin"

# Poetry의 의존성 파일을 복사하고, 의존성을 설치합니다.
COPY poetry.lock pyproject.toml /app/


# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Install psycopg2
RUN poetry add psycopg2-binary

# 소스 코드를 복사합니다.
COPY . /app/


# 컨테이너에서 실행할 명령을 설정합니다.
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]



