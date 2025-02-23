from rest_framework import serializers
from .models import *
from django.conf import settings


class ProgramSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    class Meta:
        model = Program
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # candidates = CandidateSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    post = PostSerializer()
    class Meta:
        model = Candidate
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']






