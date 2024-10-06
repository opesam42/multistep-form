"""
URL configuration for gamingform project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from subscription import views

urlpatterns = [
    path('', views.index, name='index'),
    path('step-one/', views.step_one, name='step-one'),
    # path('', views.step_one, name='index'),
    path('step-two/', views.step_two, name='step_two'),
    path('step-three/', views.step_three, name='step_three'),
    path('step-four/', views.step_four, name='step_four'),
    path('success/', views.success, name='success'),
    path('admin/', admin.site.urls),
]
