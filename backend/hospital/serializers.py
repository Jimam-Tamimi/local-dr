from rest_framework.serializers import ModelSerializer
from account.models import MyUser
from hospital.models import *
from rest_framework import serializers


class HospitalSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, allow_empty_file=True, required=False)

    class Meta:
        model = Hospital
        fields = ['id', 'name', 'image', 'email', 'password',
                  'contact', 'contact_person', 'price', 'location', 'locationName', 'deactivated']

    def create(self, validated_data):
        user_emails = MyUser.objects.filter(email=validated_data['email'])
        print(validated_data['password'])
        if(len(user_emails) > 0):
            raise serializers.ValidationError("Email already exists")
        return super().create(validated_data)



class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = ['id', 'date', 'time']


class DoctorSerializer(serializers.ModelSerializer):

    doctor_schedule = DoctorScheduleSerializer(many=True, read_only=True) 
    image = serializers.ImageField(max_length=None, use_url=True, required=False)
    class Meta:
        model = Doctor
        fields = ['id', 'hospital', 'image', 'name', 'speciality',
                  'qualification',  'doctor_schedule', 'consultation_fee']

class AppointmentSerializer(serializers.ModelSerializer):
    isPaid = serializers.BooleanField(read_only=True)
    # doctor = DoctorSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id', 'name', 'user', 'doctor', 'email', 'number',
                  'date',  "time", 'status', 'isPaid', ]

class NotificationSerializer(serializers.ModelSerializer): 
    appointment = AppointmentSerializer(read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'appointment', 'isRead',  ]


class StaffSerializer(serializers.ModelSerializer):  
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Staff
        fields = ['id', 'name', 'email', 'user', 'country', 'password' ]
