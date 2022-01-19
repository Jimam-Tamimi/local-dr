# Generated by Django 4.0 on 2022-01-19 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0012_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('in progress', 'in progress'), ('completed', 'completed')], default='in progress', max_length=20),
        ),
    ]
