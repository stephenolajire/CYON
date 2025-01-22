from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
import re
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

email_regex = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
password_regex = re.compile(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    cpassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 
                  'middle_name', 'phone_number', 'cpassword', 'house_address',
                  'state', 'local_govt', 'education', 'marital_status']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        # Import regex patterns for validation (ensure these are defined elsewhere in your code)
        email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        password_regex = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

        # Get values using correct dict access
        email = attrs.get('email')
        password = attrs.get('password')
        cpassword = attrs.get('cpassword')
        first_name = attrs.get('first_name')
        last_name = attrs.get('last_name')
        middle_name = attrs.get('middle_name', '')  # Optional fields should have defaults
        phone_number = attrs.get('phone_number')
        house_address = attrs.get('house_address', '')
        state = attrs.get('state')
        local_govt = attrs.get('local_govt', '')
        education = attrs.get('education', '')
        marital_status = attrs.get('marital_status', '')

        # Check email format
        if not re.match(email_regex, email):
            raise serializers.ValidationError({'email': 'Invalid email format'})

        # Check if email already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})

        # Check password format
        if not re.match(password_regex, password):
            raise serializers.ValidationError({
                'password': 'Password must contain at least 8 characters, '
                            'one uppercase, one lowercase, one number and '
                            'one special character'
            })

        # Check if password and confirm password match
        if password != cpassword:
            raise serializers.ValidationError({'cpassword': 'Passwords do not match'})

        # Check first name and last name lengths
        if len(first_name) < 2:
            raise serializers.ValidationError({'first_name': 'First name must be at least 2 characters'})
        if len(last_name) < 2:
            raise serializers.ValidationError({'last_name': 'Last name must be at least 2 characters'})

        # Validate phone number format (optional: customize regex for your region)
        phone_regex = r"^\+?1?\d{9,15}$"  # General international format
        if not re.match(phone_regex, phone_number):
            raise serializers.ValidationError({'phone_number': 'Invalid phone number format'})

        # Check house address (if required)
        if len(house_address.strip()) < 5:
            raise serializers.ValidationError({'house_address': 'House address must be at least 5 characters'})

        # Validate state and local government (ensure these values are valid, e.g., from a predefined list)
        valid_states = ['Osun']  # Replace with your actual states
        if state not in valid_states:
            raise serializers.ValidationError({'state': f'State must be one of {", ".join(valid_states)}'})

        if len(local_govt.strip()) < 2:
            raise serializers.ValidationError({'local_govt': 'Local government must be at least 2 characters'})

        # Validate education level (e.g., Primary, Secondary, Tertiary)
        valid_education_levels = ['Primary', 'Secondary', 'Tertiary', 'Bachelor', 'Master', 'PhD']
        if education not in valid_education_levels:
            print(education)
            raise serializers.ValidationError({'education': f'Education level must be one of {", ".join(valid_education_levels)}'})

        # Validate marital status (e.g., Single, Married, Divorced, Widowed)
        valid_marital_statuses = ['Single', 'Married', 'Divorced', 'Widowed']
        if marital_status not in valid_marital_statuses:
            raise serializers.ValidationError({'marital_status': f'Marital status must be one of {", ".join(valid_marital_statuses)}'})

        return attrs


    def create(self, validated_data):
        # Remove cpassword from validated data
        validated_data.pop('cpassword', None)
        
        # Create user with hashed password
        user = User.objects.create_user(**validated_data)
        user.save()
        # print (**validated_data)
        return user
            
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError('Email and password are required.')

        # Authenticate using custom backend
        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError('Invalid credentials or user does not exist.')

        if not user.is_active:
            raise serializers.ValidationError('This account is inactive.')

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return {
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }



    
