from rest_framework import serializers
from .models import EmailAnalysis

class EmailAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAnalysis
        fields = ['id', 'sender', 'subject', 'body', 'is_suspicious', 'analysis_date']