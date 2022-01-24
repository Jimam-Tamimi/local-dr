from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


from account.apis import *




# 
router = routers.DefaultRouter()
router.register(r'users', UserViewSets) 

urlpatterns = [
    path('is-admin/', isAdmin),  
    path('forgot_password/', forgot_password),  
    path('verify_reset_password_code/', verify_reset_password_code),  
    path('reset_password/', reset_password),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
