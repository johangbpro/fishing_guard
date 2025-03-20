from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmailAnalysisViewSet

router = DefaultRouter()
router.register(r'analysis', EmailAnalysisViewSet, basename='email-analysis')

urlpatterns = [
    path('', include(router.urls)),
]