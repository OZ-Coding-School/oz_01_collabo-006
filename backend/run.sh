#!/bin/bash

python manage.py makemigrations

python manage.py migrate

poetry run python manage.py runserver 0.0.0.0:80