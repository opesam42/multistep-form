#!/bin/bash

#create a virtual env
python -m venv venv
source venv/bin/activate

#installing pip
python -m pip install --upgrade pip

# Run migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the Django application
# gunicorn gamingform.wsgi:application --bind 0.0.0.0:$PORT --timeout 120
