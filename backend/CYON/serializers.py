from rest_framework import serializers
from .models import *


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # candidates = CandidateSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):
    post = PostSerializer()
    class Meta:
        model = Candidate
        fields = '__all__'






