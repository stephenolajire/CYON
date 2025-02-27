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
from rest_framework import generics
import requests
import uuid
from uuid import UUID

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
            return Response({
                "election_id": latest_election.id,
                "election_title": latest_election.title,
                "candidates": serializer.data
            }, status=status.HTTP_200_OK)
        
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
            message = f" Hi {contact_message.name},\n Thank you for reaching out to us! We have received your message and will get back to you as soon as possible. \n\n Here’s a copy of your message: '{contact_message.message}' \n\n Best Regards, \n CYON Ofatedo"
            
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [contact_message.email])

            # Notify admin about the new message
            mail_subject = f"New Contact Form Submission from {contact_message.name}"
            message = f"You have received a new message from {contact_message.name} ({contact_message.email}). \n\n Message: '{contact_message.message}'\n\n Please respond as soon as possible."
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [settings.EMAIL_HOST_USER])

            return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutreachListView(generics.ListAPIView):
    queryset = Outreach.objects.prefetch_related('gallery').all()
    serializer_class = OutreachSerializer


class OutreachDetailView(generics.RetrieveAPIView):
    queryset = Outreach.objects.prefetch_related('gallery').all()
    serializer_class = OutreachSerializer


class ElectionResultsAPIView(APIView):
    def get(self, request, id):
        election = get_object_or_404(Election, id=id)
        candidates = Candidate.objects.filter(election=election).order_by('-votes')
        
        serialized_candidates = CandidateSerializer(candidates, many=True, context={'request': request})

        return Response({
            "election": election.title,
            "candidates": serialized_candidates.data
        }, status=status.HTTP_200_OK)
    


class PaymentView(APIView):
    def post (self, request):
        email = request.data.get("email")
        amount = request.data.get("amount")
        phone = request.data.get("phonenumber")
        firstname = request.data.get("firstname")
        lastname = request.data.get("lastname")

        if not email or not amount or not phone or not firstname or not lastname:
            return Response({"error": "All fields are required"}, status=400)

        # Generate a unique reference ID
        code = str(uuid.uuid4())

        try:
            amount = float(request.data.get("amount"))
            if amount <= 0:
                return Response(
                    {"error": "Amount must be greater than 0"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response(
                {"error": "Invalid amount format"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        paystack_url = "https://api.paystack.co/transaction/initialize"
        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        callback_url = f"{settings.FRONTEND_URL}/donation-success/{code}/"

        payload = {
            "email": email,
            "amount": int(amount) * 100,
            "callback_url": callback_url,
        }

        response = requests.post(paystack_url, headers=headers, json=payload)
        response_data = response.json()

        if response_data.get("status"):
            donation = Donation.objects.create(phonenumber=phone, email=email, amount=amount, reference=code, firstname=firstname, lastname=lastname)
            donation.save()
            payment_url = response_data['data']['authorization_url']
            return Response({"payment_url": payment_url}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Failed to initialize payment"}, status=500)
    

class PaystackCallbackView(APIView):
    def get(self, request, code):
        reference = request.query_params.get("reference")
        if not reference:
            return Response({"error": "Reference is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            code = UUID(str(code))  # Validate UUID
        except ValueError:
            return Response({"error": "Invalid UUID"}, status=status.HTTP_400_BAD_REQUEST)

        paystack_url = f"https://api.paystack.co/transaction/verify/{reference}"
        headers = {"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"}

        response = requests.get(paystack_url, headers=headers)
        
        # Check for Paystack API errors
        if response.status_code != 200:
            return Response({"error": "Failed to verify payment"}, status=status.HTTP_502_BAD_GATEWAY)
        
        response_data = response.json()

        # Ensure response_data contains the expected keys
        if not response_data.get("status") or "data" not in response_data:
            return Response({"error": "Invalid response from Paystack"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if response_data["status"] and response_data["data"]["status"] == "success":
            # Retrieve the Donation with the matching reference
            donation = Donation.objects.get(reference=code)  # Use `.first()` to avoid QuerySet issues

            if not donation:
                return Response({"error": "Donation not found"}, status=status.HTTP_404_NOT_FOUND)

            if donation.status == "completed":
                return Response({"message": "Payment already completed"}, status=status.HTTP_200_OK)

            # Update the donation status
            donation.status = "completed"
            donation.save()

            return Response({"message": "Payment successful"}, status=status.HTTP_200_OK)

        return Response({"error": "Payment verification failed"}, status=status.HTTP_400_BAD_REQUEST)
