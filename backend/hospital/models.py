from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete, pre_save, post_delete

from account.models import MyUser
class Hospital(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=False, null=False)
    email = models.EmailField(unique=True, max_length=100, blank=False, null=False)
    password = models.TextField(blank=False, null=False)
    contact = models.CharField(max_length=20, blank=False, null=False)
    contact_person = models.CharField(max_length=20, blank=False, null=False)
    location = models.TextField(blank=False, null=False)
    price = models.PositiveIntegerField(default=0, blank=False, null=False)
    
    def __str__(self):
        return self.name



class Doctor(models.Model):
    # doctor name, spaca, qualification, 
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, null=False, blank=False)
    speciality = models.CharField(max_length=50, null=False, blank=False)
    qualification = models.CharField(max_length=50, null=False, blank=False)
    startTime = models.TimeField(blank=True, null=True)
    endTime = models.TimeField(blank=True, null=True)
    
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
    
    
    def __str__(self):
        return self.name
    

    
    
    
    
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
    
