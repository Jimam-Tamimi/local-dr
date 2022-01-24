from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid
from random import randint

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **other_fields):
        
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **other_fields):
        user = self.create_user(email, password, **other_fields)
        user.is_staff = True
        user.is_superuser = True
        
        user.save()
        return user


class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)
    name = models.CharField(max_length=20, null=True, blank=True)
    number = models.CharField(max_length=20, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)


    is_active = models.BooleanField(default=True)
    is_supperuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_hospital = models.BooleanField(default=False)

    
    can_change_password = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email   
    
    
     
     
class Verification(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    code = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    

def random_with_N_digits(n=8):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)
class ForgotPasswordCode(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    code = models.CharField(max_length=20, unique=True, default=random_with_N_digits , editable=False)
