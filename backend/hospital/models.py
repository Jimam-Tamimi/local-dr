from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, pre_save, post_delete
from django.forms import CharField

from account.models import MyUser
class Hospital(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    image = models.ImageField(upload_to='hospital/', blank=True, null=True)

    email = models.EmailField(unique=True, max_length=100, blank=False, null=False)
    password = models.TextField(blank=False, null=False)
    contact = models.CharField(max_length=20, blank=False, null=False)
    contact_person = models.CharField(max_length=20, blank=False, null=False)
    location = models.TextField(blank=False, null=False)
    locationName = models.CharField(max_length=200, default='', blank=True, null=True)
    price = models.PositiveIntegerField(default=0, blank=False, null=False)
    deactivated = models.BooleanField(default=False)
    def __str__(self):
        return self.name
     


class DoctorSchedule(models.Model):
    date = models.DateField(blank=False, null=False)
    time = models.TextField(blank=False, null=False)
      

class Doctor(models.Model):
    # doctor name, spaca, qualification, 
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, null=False, blank=False)
    image = models.ImageField(upload_to='doctor/', blank=True, null=True)
    speciality = models.CharField(max_length=50, null=False, blank=False)
    qualification = models.CharField(max_length=50, null=False, blank=False)
    doctor_schedule = models.ManyToManyField(DoctorSchedule, blank=True, null=True)

    
    def __str__(self):
        return self.name
  
    
class Appointment(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, blank=False, null=False)
    email = models.EmailField(max_length=100, null=False, blank=False)
    number = models.CharField(max_length=20, null=False, blank=False)
    date = models.DateField(null=False, blank=False)
    time = models.TimeField(null=False, blank=False)
    status = models.CharField(max_length=20, default="in progress", null=False, blank=False,choices=[('in progress','in progress'),('completed','completed')])
    payment_id = models.CharField(max_length=250, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    amount = models.PositiveIntegerField(default=0, blank=True, null=True)
    
    def __str__(self):
        return self.name
    

class Payment(models.Model):
    payment_id = models.CharField(max_length=250, null=False, blank=False)
    amount = models.PositiveIntegerField(default=0, blank=False, null=False)
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, blank=True, null=True)
    isPaid = models.BooleanField(default=False)
    
    
    
class Notification(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, blank=False, null=False) 
    isRead = models.BooleanField(default=False)
    
@receiver(pre_save, sender=Hospital)
def create_profile(sender, instance, **kwargs):
    if(instance.id is None):
        user = MyUser.objects.create(email=instance.email)
        print(instance.password)
        user.set_password(instance.password)
        user.is_hospital = True
        user.save()
        instance.user = user
    
    
@receiver(post_delete, sender=Hospital)
def create_profile(sender, instance, **kwargs):
    user = MyUser.objects.get(email=instance.email)
    user.delete()
    
