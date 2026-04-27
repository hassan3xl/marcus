
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from apps.users.auth import urls as auth_urls
from apps.users.profile import urls as profile_urls
from controllers.products import urls as products_urls

urlpatterns = [
    path('auth/', include(auth_urls)),
    path('profile/', include(profile_urls)),
    path('products/', include(products_urls)),
]
