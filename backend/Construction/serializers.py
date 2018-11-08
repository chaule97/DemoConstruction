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

class Team_Project_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('id','name','note',)

class ProjectSerializer(serializers.ModelSerializer):
    supervisor = SupervisorSerializer(many=False)
    team = Team_Project_Serializer(many=True)

    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address', 'construction_items','investor','position', 'supervisor', 'team')
        extra_kwargs = {
             "supervisor": {"read_only": True}
        }

class Project_Team_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address','investor' ,'construction_items','position')

class CreateProjectSerializer(serializers.ModelSerializer):
    team = serializers.ListField(
        child=serializers.IntegerField(min_value=1, required=False)
    )
    class Meta:
        model = Project
        fields = ('id','name', 'contruction_name', 'address', 'construction_items','position', 'investor', 'supervisor', 'team')

    def create(self, validated_data):
        project = Project()
        project.name = validated_data['name']
        project.contruction_name = validated_data['contruction_name']
        project.address = validated_data['address']
        project.construction_items = validated_data['construction_items']
        project.position = validated_data['position']
        project.investor = validated_data['investor']
        project.supervisor = validated_data['supervisor']
        project.save()
        teams = Team.objects.filter(pk__in=validated_data['team'])
        for team in teams:
            team.project = project
            team.save()
        return project

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.contruction_name = validated_data.get('contruction_name', instance.contruction_name)
        instance.address = validated_data.get('address', instance.address)
        instance.construction_items = validated_data.get('construction_items', instance.construction_items)
        instance.position = validated_data.get('position', instance.position)
        instance.investor = validated_data.get('investor', instance.investor)
        instance.supervisor = validated_data.get('supervisor', instance.supervisor)
        instance.save()
        new_teams = Team.objects.filter(pk__in=validated_data['team'])
        old_teams = Team.objects.filter(project=instance)
        for old_team in old_teams:
            if old_team not in new_teams:
                old_team.project = None
                old_team.save()
        for new_team in new_teams:
            new_team.project = instance
            new_team.save()
        return instance


class CreateTeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('id','name','note',)

class TeamSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submit
        fields = ('id','projects', 'team', 'date', 'task_name','worker_number','process', 'content', 'proposed_materials', 'job_tomorrow')

class TeamSerializer(serializers.ModelSerializer):
    project = Project_Team_Serializer(many=False)
    submits = TeamSubmitSerializer(many=True)
    class Meta:
        model = Team
        fields = ('id','name','note','project', 'submits')

class SubmitTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id','name','note')

class SubmitSerializer(serializers.ModelSerializer):
    team = SubmitTeamSerializer(many=False)
    class Meta:
        model = Submit
        fields = ('id','projects', 'team', 'date', 'task_name','worker_number','process', 'content', 'proposed_materials', 'job_tomorrow')

class CreateSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submit
        fields = ('id','projects', 'team', 'date', 'task_name','worker_number','process', 'content', 'proposed_materials', 'job_tomorrow')