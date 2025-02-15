from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class ProgramView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        # Fetch the latest program based on the `date_created` field
        latest_program = Program.objects.order_by('-date_created').first()
        
        if latest_program:
            # Serialize the latest program
            serializer = ProgramSerializer(latest_program, context={'request': request})
            return Response(serializer.data)
        else:
            # If no programs exist, return an empty response
            return Response({"message": "No programs available"}, status=status.HTTP_404_NOT_FOUND)
        

class LatestElectionCandidatesView(APIView):
    def get(self, request):
        try:
            # Get the latest election by date
            latest_election = Election.objects.latest('date')
            
            # Get all candidates related to the latest election
            candidates = Candidate.objects.filter(election=latest_election)
            
            # Serialize the candidates
            serializer = CandidateSerializer(candidates, many=True)
            
            return Response(
                serializer.data, status=status.HTTP_200_OK
            )
        except Election.DoesNotExist:
            return Response({"message": "No elections found."}, status=status.HTTP_400_BAD_REQUEST)
        

class VoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, candidate_id):
        try:
            candidate = get_object_or_404(Candidate, id=candidate_id)
            election = candidate.election
            
            if not election.is_active:
                return Response(
                    {'error': 'This election is no longer active'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if user has already voted for this post
            user_votes = request.user.votes.filter(candidate__election=election)
            voted_posts = set(vote.candidate.post.id for vote in user_votes)
            
            if candidate.post.id in voted_posts:
                return Response(
                    {'error': 'Already voted for this post'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            # Record the vote
            candidate.votes += 1
            candidate.save()
            
            # Record user's vote
            Vote.objects.create(user=request.user, candidate=candidate)
            
            return Response({'success': True}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        