from django.views.decorators.csrf import csrf_exempt
import json
from os import environ
from urllib import request
import django
from django.db.models import Q
from django.http import HttpResponse
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
from rest_framework.decorators import action, api_view, permission_classes, authentication_classes
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
from django.core.mail import send_mail
from django.conf import settings
import stripe

# Create your views here.


class HospitalViewSet(ModelViewSet):
    queryset = Hospital.objects.all().order_by('-id')
    serializer_class = HospitalSerializer
    permission_classes = [IsAdminUser]
    # authentication_classes = [BasicAuthentication]
    search_fields = ['id', 'name', 'email', 'contact', 'contact_person']
    filter_backends = (filters.SearchFilter,)
    parser_classes = [FormParser, JSONParser, MultiPartParser]

    def get_queryset(self):
        deactivated = self.request.query_params.get('deactivated', None)
        if(deactivated == 'true'):
            self.queryset = self.queryset.filter(deactivated=True)
            return self.queryset
        elif(deactivated == 'false'):
            self.queryset = self.queryset.filter(deactivated=False)
            return self.queryset

        return super().get_queryset()


@api_view(['GET'])
@permission_classes([IsAdminUser | IsHospital])
def get_user_name(request):
    print(request.user)
    if(request.user.is_superuser):
        return Response({'name': 'SuperAdmin'}, status=status.HTTP_200_OK)
    elif(request.user.is_hospital):
        try:
            hospital = Hospital.objects.get(user=request.user)
        except Hospital.DoesNotExist:
            return Response({"message": "Hospital does not exist"}, status=status.HTTP_404_NOT_FOUND)

        return Response({'type': 'hospital', 'name': hospital.name}, status=status.HTTP_200_OK)
    elif(request.user.is_staff and not request.user.is_superuser):
        try:
            staff = Staff.objects.get(user=request.user)
        except Hospital.DoesNotExist:
            return Response({"message": "Staff does not exist"}, status=status.HTTP_404_NOT_FOUND)

        return Response({'type': 'staff', 'name': staff.name}, status=status.HTTP_200_OK)


class DoctorViewSet(ModelViewSet):
    queryset = Doctor.objects.all().order_by('-id')
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminUser | IsHospital]
    search_fields = ['id',  'name', 'speciality', 'qualification']
    # authentication_classes = [BasicAuthentication]
    filter_backends = (filters.SearchFilter,)
    pagination_class = PageNumberPagination
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        print(self.request.user)
        if(self.request.user.is_superuser):
            return super().get_queryset()
        elif(self.request.user.is_hospital):
            self.queryset = self.queryset.filter(
                hospital__user=self.request.user)
            print(self.queryset, 'is hospital')
            return self.queryset
        return super().get_queryset()

    def retrieve(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        data['hospital'] = HospitalSerializer(instance.hospital).data
        return Response(data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        queryset = queryset.filter(hospital__deactivated=False)
        serializer = self.get_serializer(queryset, many=True)
        allData = serializer.data
        for data in allData:
            hospitalID = data['hospital']
            data['hospital'] = HospitalSerializer(
                Hospital.objects.get(id=hospitalID)).data
        return Response(allData, status=status.HTTP_200_OK)


@api_view(['POST', "DELETE", "GET"])
@permission_classes([IsAdminUser | IsHospital | IsAuthenticated])
def schedule_doctor(request, id=None):
    if(request.method == 'POST'):
        data = request.data
        date = data['date']
        time = data['times']
        try:
            doctor = Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"message": "Doctor does not exist"}, status=status.HTTP_404_NOT_FOUND)

        for ds in doctor.doctor_schedule.filter(date=date):
            ds.delete()

        doctor_schedule = DoctorSchedule.objects.create(date=date, time=time)

        doctor.doctor_schedule.add(doctor_schedule)
        doctor.save()

        return Response({"message": "Doctor schedule added successfully"}, status=status.HTTP_200_OK)

    if(request.method == "DELETE"):
        try:
            doctorSchedule = DoctorSchedule.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"message": "Doctor does not exist"}, status=status.HTTP_404_NOT_FOUND)

        doctorSchedule.delete()
        return Response({"message": "Doctor schedule deleted successfully"}, status=status.HTTP_200_OK)

    if(request.method == "GET"):
        try:
            doctor = Doctor.objects.get(id=id)
        except Doctor.DoesNotExist:
            return Response({"message": "Doctor does not exist"}, status=status.HTTP_404_NOT_FOUND)
        date = request.GET.get('date', None)
        if(date):
            doctorSchedule = doctor.doctor_schedule.filter(date=date)
        else:
            doctorSchedule = doctor.doctor_schedule.filter()

        serializer = DoctorScheduleSerializer(doctorSchedule, many=True)
        tmpData = serializer.data
        data = []
        appointments = Appointment.objects.filter(doctor=doctor)

        def getAppointmentTime(appointment):
            return appointment.time.strftime("%I:%M %p")

        def getStrFromTimeList(time):
            return time.replace("'", "").replace("[", "").replace(']', '').split(', ')

        for d in tmpData:
            date = d['date']
            time = getStrFromTimeList(d['time'])
            if d['time'] == "[]":
                # data = []
                break
            for appointment in appointments:
                if(str(appointment.date) == date and getAppointmentTime(appointment) in time):
                    print(time)
                    print(getAppointmentTime(appointment))
                    # print(getStrFromTimeList(time).remove(getAppointmentTime(appointment)))
                    time.remove(getAppointmentTime(appointment))

            d['time'] = str(time)

            data.append(d)
        print(data)
        return Response(data, status=status.HTTP_200_OK)


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
                doctor__hospital__user=self.request.user, isPaid=True)
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
        serializer = self.get_serializer(
            self.filter_queryset(queryset), many=True)
        tmpData = serializer.data
        data = []
        for d in tmpData:
            d['doctor'] = DoctorSerializer(
                Doctor.objects.get(id=d['doctor'])).data

            data.append(d)
        return Response(data, status=status.HTTP_200_OK)


class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all().order_by('-id')
    serializer_class = StaffSerializer
    # authentication_classes = [BasicAuthentication]
    permission_classes = [IsAdminUser]
    search_fields = ['id', 'name', 'email', 'country', ]
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        print(self.queryset)
        if(self.request.user.is_superuser):

            return super().get_queryset()
        else:
            return Staff.objects.none()

    def create(self, request, *args, **kwargs):
        if(not request.user.is_superuser):
            return Response({"message": "You are not allowed to create staff"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return super().create(request, *args, **kwargs)


@api_view(['GET'])
@permission_classes([AllowAny])
def doctorRecommendations(request):

    search = request.GET.get('search', '')
    print(search)
    if(search is None):
        return Response({"message": "Please provide a search query"}, status=status.HTTP_400_BAD_REQUEST)
    queryset = Doctor.objects.filter(
        hospital__deactivated=False).order_by('-id')
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
    queryset = Doctor.objects.filter(
        hospital__deactivated=False).order_by('-id')
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
    queryset = Doctor.objects.filter(
        hospital__deactivated=False).order_by('-id')
    queryset = queryset.filter(
        (Q(name__contains=name) | Q(hospital__name__contains=name)))
    queryset = queryset.filter(Q(speciality__contains=speciality))
    serializer = DoctorSerializer(queryset, many=True)
    allData = []
    for data in serializer.data:
        hospitalID = data['hospital']
        data['hospital'] = HospitalSerializer(
            Hospital.objects.get(id=hospitalID)).data
        print(len(data['doctor_schedule']))
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
        # if((not available(data['startTime'], data['endTime'])) and isAvailable == 'true'):
        #     continue
        if(len(data['doctor_schedule']) == 0 and isAvailable == 'true'):
            continue
        # data['available'] = available(data['startTime'], data['endTime'])
        data['available'] = len(data['doctor_schedule']) != 0
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
    try:
        appointment_id = request.data.get('appointment_id', None)
        if(appointment_id is None):
            return Response({"message": "Please provide an appointment id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if(appointment.isPaid):
            return Response({"message": "Already paid", 'type': 'paid'}, status=status.HTTP_400_BAD_REQUEST)

        amount = appointment.doctor.hospital.price

        client = razorpay.Client(
            auth=(environ['RAZOR_KEY_ID'], environ['RAZOR_KEY_SECRET']))
        payment = client.order.create({"amount": int(amount) * 100,
                                       "currency": "INR",
                                       "payment_capture": "1"})
        appointment.payment_id = payment['id']
        appointment.amount = amount
        appointment.save()
        appointment_data = AppointmentSerializer(appointment).data

        data = {
            'appointment': appointment_data,
            'payment': payment

        }

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)


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

    try:
        appointment = Appointment.objects.get(payment_id=ord_id)
    except Appointment.DoesNotExist:
        return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(
        auth=(environ['RAZOR_KEY_ID'], environ['RAZOR_KEY_SECRET']))

    check = client.utility.verify_payment_signature(data)

    # checking if the transaction is valid or not if it is "valid" then check will return None
    if check is not None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    print('payment successful')

    appointment.isPaid = True
    appointment.save()

    res_data = {
        'message': 'payment successfully received!',
        'appointment': AppointmentSerializer(appointment).data
    }
    Payment.objects.create(appointment=appointment, amount=appointment.amount,
                           payment_id=raz_pay_id, payed_with='razorpay')
    Notification.objects.create(appointment=appointment)

    try:
        send_mail(
            'Appointment Confirmation From Local Dr.',
            'Your appointment has been confirmed with Dr. ' + appointment.doctor.name + ' at ' + appointment.doctor.hospital.name +
            ' on ' + str(appointment.date) + ' at ' + str(appointment.time) +
            '. Your appointment id is ' + str(appointment.id) + '. ',
            settings.EMAIL_HOST_USER,
            [appointment.email],
        )
    except Exception as e:
        print(e)

    return Response(res_data)


@api_view(['POST'])
def paypal_payment_success(request):
    appointment_id = request.data.get('appointment_id', None)

    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    appointment.isPaid = True
    appointment.save()

    res_data = {
        'message': 'payment successfully received!',
        'appointment': AppointmentSerializer(appointment).data
    }
    Payment.objects.create(appointment=appointment, amount=appointment.amount,
                           payment_id=raz_pay_id, payed_with='razorpay')
    Notification.objects.create(appointment=appointment)

    try:
        send_mail(
            'Appointment Confirmation From Local Dr.',
            'Your appointment has been confirmed with Dr. ' + appointment.doctor.name + ' at ' + appointment.doctor.hospital.name +
            ' on ' + str(appointment.date) + ' at ' + str(appointment.time) +
            '. Your appointment id is ' + str(appointment.id) + '. ',
            settings.EMAIL_HOST_USER,
            [appointment.email],
        )
    except Exception as e:
        print(e)

    return Response(res_data)


@api_view(['GET'])
@permission_classes([IsAdminUser | IsHospital])
# @authentication_classes([BasicAuthentication])
def get_homepage_details(request):
    data = {}

    if(request.user.is_superuser):
        data['payments'] = sum(
            [payment.amount for payment in Payment.objects.all()])
        data['total_appointments'] = len(
            Appointment.objects.filter(isPaid=True))
        data['completed_appointments'] = len(
            Appointment.objects.filter(isPaid=True, status='completed'))
        data['total_hospitals'] = len(Hospital.objects.all())
        data['total_doctors'] = len(Doctor.objects.all())

    elif(request.user.is_hospital):
        data['total_appointments'] = len(Appointment.objects.filter(
            isPaid=True,  doctor__hospital__user=request.user))
        data['completed_appointments'] = len(Appointment.objects.filter(
            isPaid=True, status='completed',  doctor__hospital__user=request.user))
        data['total_doctors'] = len(
            Doctor.objects.filter(hospital__user=request.user))

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsHospital])
def get_notifications(request):

    notifications = Notification.objects.filter(
        appointment__doctor__hospital__user=request.user)
    seen = request.GET.get('seen', None)
    if(seen == 'true'):
        notifications = notifications.filter(isRead=False)
        for notification in notifications:
            notification.isRead = True
            notification.save()
        return Response(status=status.HTTP_200_OK)

    isRead = request.GET.get('isRead', None)
    if(isRead):
        notifications = notifications.filter(isRead=False)
    return Response({"notifications": NotificationSerializer(notifications, many=True).data, 'unseen': notifications.filter(isRead=False).count()}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    print(request.user)
    data = {}
    data['name'] = request.user.name
    data['email'] = request.user.email
    data['number'] = request.user.number
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def paypal_payment_success(request):

    appointment_id = request.data.get('appointment_id', None)
    payment_id = request.data.get('payment_id', None)

    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    appointment.isPaid = True
    appointment.save()

    res_data = {
        'message': 'payment successfully received!',
        'appointment': AppointmentSerializer(appointment).data
    }
    Payment.objects.create(appointment=appointment, amount=appointment.amount,
                           payment_id=payment_id, payed_with='paypal')
    Notification.objects.create(appointment=appointment)

    try:
        send_mail(
            'Appointment Confirmation From Local Dr.',
            'Your appointment has been confirmed with Dr. ' + appointment.doctor.name + ' at ' + appointment.doctor.hospital.name +
            ' on ' + str(appointment.date) + ' at ' + str(appointment.time) +
            '. Your appointment id is ' + str(appointment.id) + '. ',
            settings.EMAIL_HOST_USER,
            [appointment.email],
        )
    except Exception as e:
        print(e)

    return Response(res_data)


@api_view(['POST'])
def paypal_payment_start(request):
    try:
        appointment_id = request.data.get('appointment_id', None)
        if(appointment_id is None):
            return Response({"message": "Please provide an appointment id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if(appointment.isPaid):
            return Response({"message": "Already paid", 'type': 'paid'}, status=status.HTTP_400_BAD_REQUEST)

        amount = appointment.doctor.hospital.price

        appointment.amount = amount
        appointment.save()
        appointment_data = AppointmentSerializer(appointment).data

        data = {
            'amount': amount,
        }

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        # print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)


# stripe
@api_view(['POST', 'GET'])
def create_payment(request):
    stripe.api_key = environ['STRIPE_SECRET_KEY']
    # endpoint = stripe.WebhookEndpoint.create(
    # url='http://localhost:8000/api/tamimi/',
    # enabled_events=[
    #     'charge.failed',
    #     'charge.succeeded',
    # ],
    # )

    appointment_id = request.data.get('appointment_id', None)
    if(appointment_id is None):
        return Response({"message": "Please provide an appointment id"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    if(appointment.isPaid):
        return Response({"message": "Already paid", 'type': 'paid'}, status=status.HTTP_400_BAD_REQUEST)
    amount = appointment.doctor.hospital.price
    print(amount)

    try:
        

        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=amount * 100,
            currency='usd',
            payment_method_types=['card'],
            

            description="Software development services",
        )
        
 
        appointment.amount = amount
        appointment.payment_id = intent['id']
        appointment.save()
        print(intent)

        return Response({'client_secret': intent['client_secret'], 'amount': intent['amount']}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['POST'])
# @permission_classes([AllowAny])


@csrf_exempt
def stripe_webhook(request):
    event = None
    payload = request.body
    endpoint_secret = environ['STRIPE_ENDPOINT_SECRET']
    try:
        event = payload
    except Exception as e:
        # print('⚠️  Webhook error while parsing basic request.' + str(e))
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            # print('⚠️  Webhook signature verification failed.' + str(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # Handle the event
    if event and event['type'] == 'payment_intent.succeeded':
        # contains a stripe.PaymentIntent
        payment_intent = event['data']['object']
        payment_id = event['data']['object']['id']

        try:
            appointment = Appointment.objects.get(payment_id=payment_id)
        except Appointment.DoesNotExist:
            return Response({"message": "Appointment does not exist"}, status=status.HTTP_404_NOT_FOUND)

        appointment.isPaid = True
        appointment.save()

        Payment.objects.create(appointment=appointment, amount=appointment.amount,
                               payment_id=payment_id, payed_with='stripe')
        Notification.objects.create(appointment=appointment)

        try:
            send_mail(
                'Appointment Confirmation From Local Dr.',
                'Your appointment has been confirmed with Dr. ' + appointment.doctor.name + ' at ' + appointment.doctor.hospital.name +
                ' on ' + str(appointment.date) + ' at ' + str(appointment.time) +
                '. Your appointment id is ' + str(appointment.id) + '. ',
                settings.EMAIL_HOST_USER,
                [appointment.email],
            )
        except Exception as e:
            print(e)

        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))

    return HttpResponse('ok')
