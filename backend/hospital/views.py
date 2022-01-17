from tkinter.messagebox import RETRY
from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

# Create your views here.
class HospitalViewSet(ModelViewSet):
    queryset = Hospital.objects.all().order_by('-id')
    serializer_class = HospitalSerializer
    permission_classes = [AllowAny  ]
    search_fields = ['id', 'name', 'email', 'contact', 'contact_person' ]    
    filter_backends = (filters.SearchFilter,)
    


class DoctorViewSet(ModelViewSet):
    queryset = Doctor.objects.all().order_by('-id')
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]
    search_fields = ['id',  'name', 'speciality', 'qualification' ]    
    filter_backends = (filters.SearchFilter,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['hospital'] = HospitalSerializer(instance.hospital).data
        return Response(data, status=status.HTTP_200_OK)
    
    def list(self, request, *args, **kwargs):
        serializers = self.get_serializer(self.filter_queryset(self.get_queryset()), many=True)
        allData = serializers.data
        for data in allData:
            hospitalID = data['hospital']
            data['hospital'] = HospitalSerializer(Hospital.objects.get(id=hospitalID)).data
        return Response(allData, status=status.HTTP_200_OK) 