# Generated by Django 4.0 on 2022-01-17 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_rename_is_verified_myuser_email_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='is_hospital',
            field=models.BooleanField(default=False),
        ),
    ]