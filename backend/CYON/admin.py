from django.contrib import admin
from .models import *


class CandidateInline(admin.TabularInline):
    model = Candidate
    extra = 1  # Number of empty forms to display by default
    fields = ['name', 'post', 'votes', 'image']  # Fields to show in the inline form


@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'description']
    search_fields = ['title']
    inlines = [CandidateInline]  # Add Candidate inline to Election


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name']  # Display post names in the admin


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ['name', 'post', 'election', 'votes']
    search_fields = ['name', 'post__name', 'election__title']
    list_filter = ['post', 'election']

admin.site.register(Program)
admin.site.register(Vote)