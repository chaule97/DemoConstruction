from rest_framework import serializers
from .models import Project, Team, Submit
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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
        fields = ('id','url','username', 'password')
        extra_kwargs = {
             "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return user

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id','url','name', 'admin')

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('id','url','name')

class SubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submit
        fields = ('id','url','projects', 'team', 'date', 'content')