from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'hospitals', HospitalViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('doctors/recommendations/', doctorRecommendations),
    path('speciality/recommendations/', specialityRecommendations),
    path('search/', search),
    
] + router.urls