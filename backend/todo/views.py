from django.shortcuts import render
from rest_framework import viewsets
from . import seralizers
from . import models

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = seralizers.TodoSeralizers
