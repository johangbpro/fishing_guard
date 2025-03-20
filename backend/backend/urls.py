from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include
from django.urls import path, re_path
from django.views.static import serve
from django.conf import settings

index_view = TemplateView.as_view(template_name='index.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('phishing_detector.urls')),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    re_path(r'^$', index_view),
    re_path(r'^(?!static/)(?!api/).*$', index_view),
]