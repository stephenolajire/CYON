from django.urls import path
from .views import *

urlpatterns = [
    path ('program', ProgramView.as_view(), name='program'),
    path('candidates', LatestElectionCandidatesView.as_view(), name='latest-election-candidates'),
    path('vote/<int:candidate_id>/', VoteView.as_view(), name='vote'),
]