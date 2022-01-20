import json
from os import environ
from urllib import request
from django.shortcuts import render
from django.db.models import Q
from hospital.helpers import available
from hospital.helpers import distance
import razorpay
from hospital.permission import IsHospital
from .serializers import *
from .models import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework import filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
# Create your views here.


class HospitalViewSet(ModelViewSet):
    queryset = Hospital.objects.all().order_by('-id')
    serializer_class = HospitalSerializer
    permission_classes = [IsAdminUser]
    search_fields = ['id', 'name', 'email', 'contact', 'contact_person']
    filter_backends = (filters.SearchFilter,)
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    
    def get_queryset(self):
        deactivated = self.request.query_params.get('deactivated', None)
        if(deactivated=='true'):
            self.queryset = self.queryset.filter(deactivated=True)
            return self.queryset
        elif(deactivated=='false'):
            self.queryset = self.queryset.filter(deactivated=False)
            return self.queryset
            
        return super().get_queryset()

class DoctorViewSet(ModelViewSet):
    queryset = Doctor.objects.all().order_by('-id')
    serializer_class = DoctorSerializer
    # authentication_classes = [BasicAuthentication]
    permission_classes = [IsAdminUser | IsHospital]
    search_fields = ['id',  'name', 'speciality', 'qualification']
    filter_backends = (filters.SearchFilter,)
    pagination_class = PageNumberPagination
    parser_classes = [MultiPartParser, FormParser, JSONParser]


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
        queryset = self.get_queryset()
        queryset = queryset.filter(hospital__deactivated=False)
        serializer = self.get_serializer(queryset, many=True)
        allData = serializer.data
        for data in allData:
            hospitalID = data['hospital']
            data['hospital'] = HospitalSerializer(
                Hospital.objects.get(id=hospitalID)).data
        return Response(allData, status=status.HTTP_200_OK)


class AppointmentViewSet(ModelViewSet):
    queryset = Appointment.objects.all().order_by('-id')
    serializer_class = AppointmentSerializer
    # authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    search_fields = ['id', 'name', 'doctor__name', 'email', 'number',
                     'date',  "time", 'status']
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        print(self.queryset)
        if(self.request.user.is_superuser):

            print(self.queryset, 'is superuser')
            return super().get_queryset()
        elif(self.request.user.is_hospital):
            
            self.queryset = self.queryset.filter(
                doctor__hospital__user=self.request.user)
            print(self.queryset, 'is hospital')
            return self.queryset
        elif(self.request.user.is_authenticated):
            
            self.queryset = self.queryset.filter(user=self.request.user)
            print(self.queryset, 'is user')
            return self.queryset

    def create(self, request, *args, **kwargs):
        time = request.data['time']
        date = request.data['date']
        appointment = Appointment.objects.filter(time=time, date=date)
        if(len(appointment) != 0):
            return Response({"message": "Appointment On This Time Not Available. Please change your time"}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        tmpData = serializer.data
        data = []
        for d in tmpData:
            d['doctor'] = DoctorSerializer(Doctor.objects.get(id=d['doctor'])).data
            data.append(d)
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_booked_times(self, request):
        date = request.GET.get('date', None)
        if(date):
            appointment = Appointment.objects.filter(date=date)
            serializer = self.get_serializer(appointment, many=True)
            tmpData = serializer.data
            allData = []
            for data in tmpData:
                allData.append(data['time'])

            return Response(allData, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def doctorRecommendations(request):

    search = request.GET.get('search', '')
    print(search)
    if(search is None):
        return Response({"message": "Please provide a search query"}, status=status.HTTP_400_BAD_REQUEST)
    queryset = Doctor.objects.filter(hospital__deactivated=False).order_by('-id')
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
    queryset = Doctor.objects.filter(hospital__deactivated=False).order_by('-id')
    queryset = queryset.filter(speciality__contains=search)
    data = []
    for item in queryset:
        if(item.name not in data):
            data.append(item.name)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def search(request):

    name = request.GET.get('doctor', '')
    lat = request.GET.get('lat', '')
    lng = request.GET.get('lng', '')
    speciality = request.GET.get('speciality', '')
    isAvailable = request.GET.get('available', '')
    maxDistance = request.GET.get('max-distance', 30)
    queryset = Doctor.objects.filter(hospital__deactivated=False).order_by('-id')
    queryset = queryset.filter(
        (Q(name__contains=name) | Q(hospital__name__contains=name)))
    queryset = queryset.filter(Q(speciality__contains=speciality))
    serializer = DoctorSerializer(queryset, many=True)
    allData = []
    for data in serializer.data:
        hospitalID = data['hospital']

        data['hospital'] = HospitalSerializer(
            Hospital.objects.get(id=hospitalID)).data
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
        if((not available(data['startTime'], data['endTime'])) and isAvailable == 'true'):
            continue
        data['available'] = available(data['startTime'], data['endTime'])
        allData.append(data)

    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(allData, request)
    return paginator.get_paginated_response(result_page)

    # return Response(allData, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def doctorData(request, id=None):
    if(id):
        try:
            doctor = Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"message": "Doctor does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = DoctorSerializer(doctor)
        data = serializer.data
        data['hospital'] = HospitalSerializer(doctor.hospital).data
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Please provide a doctor id"}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def start_payment(request):
    amount = 10
    name = 'name'
    PUBLIC_KEY = environ
    client = razorpay.Client(auth=(environ['RAZOR_KEY_ID'], environ['RAZOR_KEY_SECRET']))
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
    return Response(payment, status=status.HTTP_200_OK)

@api_view(['POST'])
def handle_payment_success(request):
    res = json.loads(request.data["response"])
    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""
    
    # res.keys() will give us list of keys in res

    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]
            
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }
    
    client = razorpay.Client(auth=(environ['RAZOR_KEY_ID'], environ['RAZOR_KEY_SECRET']))

    check = client.utility.verify_payment_signature(data)

    # checking if the transaction is valid or not if it is "valid" then check will return None
    if check is not None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})
    

    # if payment is successful that means check is None then we will turn isPaid=True
    print('payment successful')
    
    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)