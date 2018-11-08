from django.shortcuts import render
from .models import Project, Team, Submit
from django.contrib.auth.models import User
from .serializers import LoginSerializer, UserSerializer, CreateProjectSerializer, ProjectSerializer, CreateTeamSerializer, TeamSerializer, CreateSubmitSerializer, SubmitSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.http import Http404

# Create your views here.
class LoginAPI(APIView):
    permission_classes = []
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CreateProjectAPI(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        data = Project.objects.all()
        serializer = ProjectSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            project = serializer.save()
            serializer = ProjectSerializer(project, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailProjectAPI(APIView):
    permission_classes = []

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project, many=False)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        project = self.get_object(pk)
        serializer = CreateProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            serializer = ProjectSerializer(project, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        project = self.get_object(pk)
        old_teams = Team.objects.filter(project=project)
        for old_team in old_teams:
            old_team.project = None
            old_team.save()
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateTeamAPI(APIView):
    permission_classes = []
    serializer_class = CreateTeamSerializer

    def get(self, request, *args, **kwargs):
        data = Team.objects.all()
        serializer = TeamSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CreateTeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            serializer = TeamSerializer(team, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailTeamAPI(APIView):
    permission_classes = []
    serializer_class = CreateTeamSerializer

    def get_object(self, pk):
        try:
            return Team.objects.get(pk=pk)
        except Team.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        team = self.get_object(pk)
        serializer = TeamSerializer(team, many=False)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        team = self.get_object(pk)
        serializer = CreateTeamSerializer(team, data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            serializer = TeamSerializer(project, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        team = self.get_object(pk)
        team.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CreateSubmitAPI(APIView):
    permission_classes = []
    serializer_class = CreateSubmitSerializer

    def get(self, request, *args, **kwargs):
        data = Submit.objects.all()
        serializer = SubmitSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CreateSubmitSerializer(data=request.data)
        if serializer.is_valid():
            submit = serializer.save()
            serializer = TeamSerializer(submit, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailSubmitAPI(APIView):
    permission_classes = []
    serializer_class = CreateSubmitSerializer

    def get_object(self, pk):
        try:
            return Submit.objects.get(pk=pk)
        except Submit.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        submit = self.get_object(pk)
        serializer = SubmitSerializer(submit, many=False)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        submit = self.get_object(pk)
        serializer = CreateSubmitSerializer(submit, data=request.data)
        if serializer.is_valid():
            submit = serializer.save()
            serializer = SubmitSerializer(submit, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        submit = self.get_object(pk)
        submit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)