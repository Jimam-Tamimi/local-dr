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
    path('get-doctor-data/<int:id>/', doctorData),
    path('search/', search),
    path('razorpay/pay/', start_payment, name="payment"),
    path('razorpay/payment/success/', handle_payment_success, name="payment_success"),
    path(r'schedule-doctor/<int:id>/', schedule_doctor),
    path(r'get_doctor_name/', get_doctor_name), 
    path(r'get_notifications/', get_notifications),
    
] + router.urls