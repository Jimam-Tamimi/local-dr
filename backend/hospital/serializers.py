from rest_framework.serializers import ModelSerializer
from hospital.models import *
from rest_framework import serializers


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'email',  'contact', 'contact_person' ,'price', 'location']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'hospital', 'name', 'speciality', 'qualification' ]    
        