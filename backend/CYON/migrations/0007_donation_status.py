# Generated by Django 5.1.6 on 2025-02-26 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CYON', '0006_donation_reference'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='status',
            field=models.CharField(default='pending', max_length=200),
        ),
    ]
