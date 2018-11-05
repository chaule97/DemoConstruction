from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
router.register('project', views.ProjectViewSet)
router.register('team', views.TeamViewSet)
router.register('submit', views.SubmitViewSet)


urlpatterns = [ 
     path('', include(router.urls)),
     path('login/', views.LoginAPI.as_view(), name='api_login'),
]
#urlpatterns += router.urls