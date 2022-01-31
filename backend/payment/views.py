from django.shortcuts import render

from hospital.models import Appointment

# Create your views here.
def payForAppointment(request, id=None):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return render(request, 'payment.html', {'error': 'Appointment does not exist', 'appointment': 'DOES_NOT_EXIST'})
    
    return render(request, 'payment.html', {'appointment': appointment})

    