from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)

urlpatterns = [
     path('', include(router.urls)),
     path('login/', views.LoginAPI.as_view(), name='api_login'),
     path('project/', views.CreateProjectAPI.as_view(), name='project'),
     path('project/<int:pk>/', views.DetailProjectAPI.as_view(), name='project_detail'),
     path('team/', views.CreateTeamAPI.as_view(), name='team'),
     path('team/<int:pk>/', views.DetailTeamAPI.as_view(), name='team_detail'),
     path('submit/', views.CreateSubmitAPI.as_view(), name='submit'),
     path('submit/<int:pk>/', views.DetailTeamAPI.as_view(), name='submit_detail')
]
#urlpatterns += router.urls