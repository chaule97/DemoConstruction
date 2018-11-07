from rest_framework import serializers
from .models import Project, Team, Submit
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.serializers import SerializerMethodField

class LoginSerializer(serializers.ModelSerializer):
    access =  serializers.BooleanField(read_only=True)
    type_user = serializers.CharField(read_only=True)
    username = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'access', 'type_user')
        extra_kwargs = {
            'username': {'write_only': True},
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        return value

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            data['access'] = True
            data['id'] = user.id
            if user.is_superuser:
                data['type_user'] = 'admin'
            else:
                data['type_user'] = 'supervisor'
        else:
            data['access'] = False
            data['type_user'] = ''
        return data

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','url','username', 'password','email', 'is_superuser')
        extra_kwargs = {
             "password": {"write_only": True},
             "is_staff": {"read_only": True},
             "is_superuser": {"read_only": True},
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return user

class SupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'is_staff')
        extra_kwargs = {
             "is_staff": {"read_only": True},
        }

class ProjectSerializer(serializers.ModelSerializer):
    supervisor = SupervisorSerializer(many=False)

    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address', 'construction_items','position', 'supervisor')
        extra_kwargs = {
             "supervisor": {"read_only": True}
        }

class Project_Team_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address', 'construction_items','position')

class CreateProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address', 'construction_items','position', 'supervisor')


class CreateTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('id','name','project')

class TeamSerializer(serializers.ModelSerializer):
    project = Project_Team_Serializer(many=False)
    class Meta:
        model = Team
        fields = ('id','name','project')


class SubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submit
        fields = ('id','url','projects', 'team', 'date', 'task_name','worker_number','process', 'content', 'proposed_materials', 'job_tomorrow')