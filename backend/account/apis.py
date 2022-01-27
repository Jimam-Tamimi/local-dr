from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from hospital.permission import IsHospital
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes 


from account.models import *
from .serializers import *
from account.threads import SendEmail
from account.helpers import sendVerificationEmail
 



# Create your views here.

User = get_user_model()

class UserViewSets(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer 

    
    def create(self, request, *args, **kwargs):
        serializer =  self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        try:
            user = User.objects.get(email=serializer.data['email'])
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        verification = Verification.objects.create(user=user)
        code = verification.code
        data = serializer.data
        refresh = RefreshToken.for_user(user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['success'] = True
        sendVerificationEmail([user.email], code)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers, )
    
     
     
def vallidateToken(request):
    return Response({"vallied": True, 'message': 'Token is vallied', }, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    data = request.data
    print(data)
    email = data.get('email', None)
    try:
        user = MyUser.objects.get(email=email)
    except MyUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    forgotPasswordCode = ForgotPasswordCode.objects.create(user=user)
    subject = "Password reset code for your account from Local Doctor"
    message = f'Your password reset code is {forgotPasswordCode.code}'
    SendEmail(subject, message, [user.email]).start()

    return Response({'success': True, 'message': 'Password reset code sent to your email'}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([AllowAny])
def verify_reset_password_code(request):
    data = request.data
    print(data)
    code  = data.get('code', None)
    try:
        forgotPasswordCode = ForgotPasswordCode.objects.get(code=code)
        forgotPasswordCode.user.can_change_password = True
        forgotPasswordCode.user.save()
        return Response({'success': True, 'message': 'Password reset code is vallied'}, status=status.HTTP_200_OK)
    except MyUser.DoesNotExist:
        return Response({'error': 'Code does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    data = request.data
    print(data)
    email     = data.get('email', None) 
    password    = data.get('password', None) 
    cpassword    = data.get('cpassword', None) 
    if(password != cpassword):
        return Response({'error': 'Password and confirm password does not match'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = MyUser.objects.get(email=email)
        if(user.can_change_password):
            user.set_password(password)
            user.can_change_password = False
            user.save()
            return Response({'success': True, 'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': "You are not alloud to change this user's password!!"}, status=status.HTTP_400_BAD_REQUEST)
    except MyUser.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)






@api_view(['POST'])
@permission_classes([IsAdminUser|IsHospital])
def isAdmin(request):
    if(request.user.is_superuser):
        return Response({"isAdmin": True, 'type': 'superuser', 'message': 'User is superuser', }, status=status.HTTP_200_OK)
    elif(request.user.is_hospital):
        return Response({"isAdmin": True, 'type': 'hospital', 'message': 'User is hospital', }, status=status.HTTP_200_OK)
    elif(request.user.is_staff and not request.user.is_superuser):
        return Response({"isAdmin": True, 'type': 'staff', 'message': 'User is staff', }, status=status.HTTP_200_OK)
    else:
        return Response({"isAdmin": False, 'type': 'user', 'message': 'User is unknown', }, status=status.HTTP_403_FORBIDDEN)
    
    
    