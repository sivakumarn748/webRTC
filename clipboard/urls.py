from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.page, name='page'),
    path('submit/', view=views.submit, name='submit')
]