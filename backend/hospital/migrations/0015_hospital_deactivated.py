# Generated by Django 4.0 on 2022-01-19 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0014_doctor_image_hospital_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='hospital',
            name='deactivated',
            field=models.BooleanField(default=False),
        ),
    ]