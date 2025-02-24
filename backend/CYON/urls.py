from django.urls import path
from .views import *

urlpatterns = [
    path ('program', ProgramView.as_view(), name='program'),
    path('candidates', LatestElectionCandidatesView.as_view(), name='latest-election-candidates'),
    path('vote/<int:candidate_id>/', VoteView.as_view(), name='vote'),
    path("contact/", ContactMessageView.as_view(), name="contact-form"),
    path('outreach/', OutreachListView.as_view(), name='outreach-list'),
    path('outreach/<int:pk>/', OutreachDetailView.as_view(), name='outreach-detail'),
    path("results/<str:id>/", ElectionResultsAPIView.as_view(), name="election-results"),
]