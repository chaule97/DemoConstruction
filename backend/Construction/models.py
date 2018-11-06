from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=30)
    contruction_name = models.CharField(max_length=15)
    address = models.CharField(max_length=15)
    construction_items = models.CharField(max_length=15)
    position = models.CharField(max_length=15)
    admin = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='projects')

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=30)
    project = models.ForeignKey(Project, on_delete=models.DO_NOTHING, related_name='team')

    def __str__(self):
        return self.name

class Submit(models.Model):
    projects = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='submits')
    team = models.ForeignKey(Team, on_delete=models.DO_NOTHING, related_name='submits')
    date = models.DateField(auto_now_add=True)
    task_name = models.CharField(max_length=30)
    worker_number = models.IntegerField()
    process = models.IntegerField()
    content = models.TextField()
    proposed_materials = models.TextField()
    job_tomorrow = models.TextField(null=True)


    class Meta:
        unique_together = ('projects', 'team', 'date')