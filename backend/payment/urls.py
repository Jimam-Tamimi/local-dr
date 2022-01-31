from django.urls import path
from .views import * 
 
urlpatterns = [
    path('appointmet/<int:id>/', payForAppointment),
 
    
]  