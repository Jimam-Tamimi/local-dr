from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'hospitals', HospitalViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'staff', StaffViewSet)

urlpatterns = [
    path('doctors/recommendations/', doctorRecommendations),
    path('speciality/recommendations/', specialityRecommendations),
    path('get-doctor-data/<int:id>/', doctorData),
    path('search/', search),
    path('razorpay/pay/', start_payment, name="payment"),
    path('razorpay/payment/success/', handle_payment_success, name="payment_success"),
    path(r'schedule-doctor/<int:id>/', schedule_doctor),
    path(r'get_user_name/', get_user_name), 
    path(r'get_homepage_details/', get_homepage_details), 
    path(r'get_notifications/', get_notifications),
    path(r'get_user_data/', get_user_data),

    path(r'paypal_payment_start/', paypal_payment_start),
    path(r'paypal_payment_success/', paypal_payment_success),

    path(r'stripe_payment_start/', create_payment),
    path(r'stripe-webhook/', stripe_webhook),
    
] + router.urls