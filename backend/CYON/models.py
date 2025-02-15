from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from cloudinary.models import CloudinaryField

User = get_user_model()

# Create your models here.
class Program(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=500)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    image =  CloudinaryField('image', blank=True, null=True) # Path for storing images

    class Meta:
        ordering = ['-date_created']  # Default ordering by `date_created` in descending order

    def __str__(self):
        return self.title
    

class Post(models.Model):
    name = models.CharField(max_length=100)
    

    def __str__(self):
        return self.name


class Election(models.Model):
    title = models.CharField(max_length=200)  # E.g., "2025 General Election"
    date = models.DateField()  # Date of the election
    description = models.TextField(blank=True, null=True)  # Optional description
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.pk:  # If this is a new election
            super().save(*args, **kwargs)
            # Schedule deactivation after 24 hours
            deactivation_time = self.created_at + timedelta(hours=24)
            # You'll need to implement celery or django-background-tasks for this
            # schedule_deactivation(self.pk, deactivation_time)
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Candidate(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE, related_name='candidates')
    name = models.CharField(max_length=100)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='candidates')
    votes = models.IntegerField(default=0)
    image =  CloudinaryField('image', blank=True, null=True)  # Path for storing images

    def __str__(self):
        return f"{self.name} - {self.post.name} ({self.election.title})"
    

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'candidate']
