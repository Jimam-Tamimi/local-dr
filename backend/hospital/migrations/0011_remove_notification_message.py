# Generated by Django 4.0 on 2022-01-23 19:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0010_notification'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='message',
        ),
    ]
