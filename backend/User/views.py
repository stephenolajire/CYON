from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.conf import settings
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

User = get_user_model()

class SignUpView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this view

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            mail_subject = f"Welcome to CYON St. George Ofatedo, {user.first_name} {user.last_name}!"
            message = (
                f"Dear Mr/Mrs {user.first_name} {user.last_name},\n\n"
                "We are overjoyed to welcome you to the Catholic Youth\n"
                "Organization of Nigeria (CYON), St. George Parish, Ofatedo.\n"
                "Becoming a part of our spiritual family is a blessing,\n"
                "and we are excited to share this beautiful journey of faith, hope,\n"
                "and love with you.\n\n"
                "Once again, welcome aboard, and may God’s blessings always be with you.\n\n"
                "Warm regards,\n"
                "CYON St. George Ofatedo"
            )
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [user.email])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # For debugging purposes
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
