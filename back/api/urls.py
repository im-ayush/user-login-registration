from django.conf.urls import url, include
from rest_framework import routers
from api.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^', include(router.urls)),
]
