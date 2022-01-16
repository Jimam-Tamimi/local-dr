from rest_framework.serializers import ModelSerializer
from hospital.models import *
from rest_framework import serializers


class HospitalSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'email', 'password', 'contact', 'contact_person', 'location']