from django.conf.urls import include
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include("account.urls")), 
    path('api/', include("hospital.urls")), 
    
]
