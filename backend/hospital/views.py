import json
from django.shortcuts import render
from django.db.models import Q
from hospital.helpers import distance

from hospital.permission import IsHospital
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny, DjangoObjectPermissions
from rest_framework import filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination
# Create your views here.


class HospitalViewSet(ModelViewSet):
    queryset = Hospital.objects.all().order_by('-id')
    serializer_class = HospitalSerializer
    permission_classes = [IsAdminUser]
    search_fields = ['id', 'name', 'email', 'contact', 'contact_person']
    filter_backends = (filters.SearchFilter,)


class DoctorViewSet(ModelViewSet):
    queryset = Doctor.objects.all().order_by('-id')
    serializer_class = DoctorSerializer
    # authentication_classes = [BasicAuthentication]
    permission_classes = [IsAdminUser | IsHospital]
    search_fields = ['id',  'name', 'speciality', 'qualification']
    filter_backends = (filters.SearchFilter,)
    pagination_class = PageNumberPagination

    def get_queryset(self):
        print(self.request.user)
        if(not self.request.user.is_superuser):
            queryset = self.queryset.filter(hospital__user=self.request.user)
            return queryset
        return super().get_queryset()

    def retrieve(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        data['hospital'] = HospitalSerializer(instance.hospital).data
        return Response(data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        serializers = self.get_serializer(
            self.filter_queryset(self.get_queryset()), many=True)
        allData = serializers.data
        for data in allData:
            hospitalID = data['hospital']
            data['hospital'] = HospitalSerializer(
                Hospital.objects.get(id=hospitalID)).data
        return Response(allData, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def doctorRecommendations(request):

    search = request.GET.get('search', '')
    print(search)
    if(search is None):
        return Response({"message": "Please provide a search query"}, status=status.HTTP_400_BAD_REQUEST)
    queryset = Doctor.objects.all().order_by('-id')
    queryset = queryset.filter(name__contains=search)
    data = []
    for item in queryset:
        if(item.name not in data):
            data.append(item.name)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def specialityRecommendations(request):

    search = request.GET.get('search', '')
    print(search)
    if(search is None):
        return Response({"message": "Please provide a search query"}, status=status.HTTP_400_BAD_REQUEST)
    queryset = Doctor.objects.all().order_by('-id')
    queryset = queryset.filter(speciality__contains=search)
    data = []
    for item in queryset:
        if(item.name not in data):
            data.append(item.name)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):

    def filter_doctor(queryset, name, speciality):
        tmpQ = []
        for item in queryset:
            if(name in item.name or name in item.hospital.name):
                if(speciality in item.speciality):
                    tmpQ.append(item)
        return tmpQ
    name = request.GET.get('doctor', '')
    lat = request.GET.get('lat', '')
    lng = request.GET.get('lng', '')
    speciality = request.GET.get('speciality', '')
    maxDistance = request.GET.get('max-distance', 30)
    print(maxDistance)
    queryset = Doctor.objects.all().order_by('-id')
    queryset = queryset.filter(
        (Q(name__contains=name) | Q(hospital__name__contains=name)))
    queryset = queryset.filter(Q(speciality__contains=speciality))
    serializer = DoctorSerializer(queryset, many=True)
    allData = []
    for data in serializer.data:
        hospitalID = data['hospital']
        
        data['hospital'] = HospitalSerializer(Hospital.objects.get(id=hospitalID)).data
        if(lat != '' and lng != ''):
            try:

                location1 = {'lat': float(lat), 'lng': float(lng)}
                location2 = json.loads(data['hospital']['location'])
                dis = distance(location1, location2)
                print(dis, 'dis')
                if(dis > float(maxDistance)):
    
                    continue
            except Exception as e:
                print(e)
        allData.append(data)
    print(len(serializer.data))
    print(len(allData))
    return Response(allData, status=status.HTTP_200_OK)
