# Generated by Django 5.1.5 on 2025-02-15 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CYON', '0003_election_created_at_election_is_active_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='image',
            field=models.ImageField(default=' ', upload_to='program_images/'),
        ),
    ]
