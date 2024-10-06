#!/bin/bash

# Install pip and upgrade it
python -m pip install --upgrade pip

# Run migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput --clear

# Start the Django application
gunicorn gamingform.wsgi:application --bind 0.0.0.0:$PORT --timeout 120
