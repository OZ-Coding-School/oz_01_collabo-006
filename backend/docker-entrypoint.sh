#!/bin/bash
set -e

# Django 애플리케이션 초기화
python manage.py migrate
python manage.py collectstatic --no-input

# Django 애플리케이션 시작
exec "$@"