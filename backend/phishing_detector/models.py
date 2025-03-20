from django.db import models

class EmailAnalysis(models.Model):
    sender = models.EmailField()
    subject = models.CharField(max_length=255)
    body = models.TextField()
    is_suspicious = models.BooleanField(default=False)
    analysis_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.sender} - {'Suspicious' if self.is_suspicious else 'Safe'}"