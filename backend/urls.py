from django.urls import path, include
from rest_framework.routers import DefaultRouter
from phishing_detector.views import EmailAnalysisViewSet

router = DefaultRouter()
router.register(r'email-analysis', EmailAnalysisViewSet, basename='email-analysis')

urlpatterns = [
    # ... other URL patterns ...
    path('api/', include(router.urls)),
] 