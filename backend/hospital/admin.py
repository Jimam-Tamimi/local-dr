from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register((Hospital, Doctor, Appointment, DoctorSchedule, Payment, Notification, Staff))