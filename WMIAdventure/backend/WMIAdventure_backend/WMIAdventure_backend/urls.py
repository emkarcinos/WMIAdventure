"""WMIAdventure_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/userprofiles/', include('IngameUsers.urls')),
    path('api/users/', include('users.urls')),
    path('api/cards/', include('cards.urls')),
    path('api/battle/', include('battle.urls')),
    path('api/proposed-content/', include('proposed_content.urls')),
    path('docs/', include_docs_urls(title="WMIAdventure API")),
    # Files are stored here
    # Download links are served in download/ domain,
    # File viewing is at get/ domain.
    url(r'^files/', include('db_file_storage.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
