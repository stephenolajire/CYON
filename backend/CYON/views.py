from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.mail import send_mail
from django.conf import settings

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
            latest_election = Election.objects.latest('created_at')
            
            # Get all candidates related to the latest election
            candidates = Candidate.objects.filter(election=latest_election).order_by('date_created')
            
            # Serialize the candidates
            serializer = CandidateSerializer(candidates, many=True, context={'request': request})
            
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
        

class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            contact_message = serializer.save()

            # Send confirmation email to the user
            mail_subject = "Your Message Has Been Received"
            message = f"""
            Hi {contact_message.name},

            Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.

            Here’s a copy of your message:
            "{contact_message.message}"

            Best Regards,
            CYON Ofatedo
            """
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [contact_message.email])

            # Notify admin about the new message
            mail_subject = f"New Contact Form Submission from {contact_message.name}"
            message = f"""
            You have received a new message from {contact_message.name} ({contact_message.email}).

            Message:
            "{contact_message.message}"

            Please respond as soon as possible.
            """
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [settings.EMAIL_HOST_USER])

            return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
