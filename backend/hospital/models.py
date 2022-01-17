from statistics import mode
from django.db import models

# Create your models here.


class Hospital(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
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
    
    def __str__(self):
        return self.name