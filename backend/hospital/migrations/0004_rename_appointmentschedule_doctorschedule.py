# Generated by Django 4.0 on 2022-01-22 14:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0003_alter_doctor_appointment_schedule'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='AppointmentSchedule',
            new_name='DoctorSchedule',
        ),
    ]