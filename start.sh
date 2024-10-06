#!/bin/bash

#create a virtual env
python3 -m venv venv
source venv/bin/activate

#installing pip
python3 -m pip install --upgrade pip

# Run migrations
python3 manage.py makemigrations --noinput
python3 manage.py migrate --noinput

# Collect static files
python3 manage.py collectstatic --noinput

# Start the Django application
# gunicorn gamingform.wsgi:application --bind 0.0.0.0:$PORT --timeout 120
