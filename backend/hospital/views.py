from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import filters
# Create your views here.
class HospitalViewSet(ModelViewSet):
    queryset = Hospital.objects.all().order_by('-id')
    serializer_class = HospitalSerializer
    permission_classes = [AllowAny]
    search_fields = ['id', 'name', 'email', 'contact', 'contact_person' ]    
    filter_backends = (filters.SearchFilter,)
