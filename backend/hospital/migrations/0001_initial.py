# Generated by Django 4.0 on 2022-01-16 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.TextField()),
                ('contact', models.CharField(max_length=20)),
                ('contact_person', models.CharField(max_length=20)),
                ('location', models.TextField()),
            ],
        ),
    ]
