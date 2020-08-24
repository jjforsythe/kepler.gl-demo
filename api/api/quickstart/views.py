from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from api.quickstart.serializers import UserSerializer, GroupSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

import csv, json

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view()
@renderer_classes([JSONRenderer])
def map_data(request):

    # Load UK city dataset
    city_data = []
    with open('api/quickstart/data/gb.csv') as csv_file:
        csvReader = csv.DictReader(csv_file)
        for row in csvReader:
            city_data.append([row['city'],
                              float(row['lat']),
                              float(row['lng']),
                              row['population']])

    # Load kepler.gl config
    with open('api/quickstart/data/kepler-config.json') as json_file:
        config = json.load(json_file)

    content = {
        'datasets': {
            'info': {
                'label': 'UK Cities',
                'id': 'uk_cities'
            },
            'data': {
                'fields': [
                    {'name': 'city', 'format': '', 'type': 'string'},
                    {'name': 'point_latitude', 'format': '', 'type': 'real'},
                    {'name': 'point_longitude', 'format': '', 'type': 'real'},
                    {'name': 'population', 'format': '', 'type': 'real'}
                ],
                'rows': city_data
            }
        },
        'config': config
    }

    return Response(content)
