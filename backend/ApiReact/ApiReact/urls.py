"""
URL configuration for ApiReact project.

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
from ApiReactApp.views import ClienteAPIView, LibroAPIView, AlquilerLibroAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clientes/', ClienteAPIView.as_view(), name='clientes'),
    path('api/libros/', LibroAPIView.as_view(), name='libros'),
    path('api/alquileres/', AlquilerLibroAPIView.as_view(), name='alquileres'),
]

