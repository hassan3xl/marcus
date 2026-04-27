    
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('router.shop_urls')),
    path('api/auth/', include('apps.users.auth.urls')),
    path('api/inventory/', include('router.inventory_urls')),
] 
