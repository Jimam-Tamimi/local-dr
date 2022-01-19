from rest_framework.serializers import ModelSerializer
from account.models import MyUser
from hospital.models import *
from rest_framework import serializers


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'image', 'email', 'password',
                  'contact', 'contact_person', 'price', 'location', 'deactivated']

    def create(self, validated_data):
        user_emails = MyUser.objects.filter(email=validated_data['email'])
        print(validated_data['password'])
        if(len(user_emails) > 0):
            raise serializers.ValidationError("Email already exists")
        return super().create(validated_data)


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'hospital', 'image', 'name', 'speciality',
                  'qualification',  "startTime", "endTime"]

class AppointmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appointment
        fields = ['id', 'name', 'user', 'doctor', 'email', 'number',
                  'date',  "time", 'status']
