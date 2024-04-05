FROM python:3.12

WORKDIR /app

# Create and activate virtual environment
RUN pip install poetry

COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false && poetry install --no-root

COPY . /app
# Wait for MongoDB to be ready
RUN apt-get update && apt-get install -y netcat-traditional

# COPY wait-for-db.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/wait-for-db.sh


# 실행할 명령 설정
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]

# CMD ["wait-for-db.sh", "db", "python", "manage.py", "runserver", "0.0.0.0:8000"]
