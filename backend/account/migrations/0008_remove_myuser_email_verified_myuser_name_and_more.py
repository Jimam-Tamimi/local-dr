# Generated by Django 4.0 on 2022-01-24 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_myuser_is_hospital'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='email_verified',
        ),
        migrations.AddField(
            model_name='myuser',
            name='name',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
