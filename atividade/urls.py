from django.conf.urls import url
from . import views

app_name = 'atividade'

urlpatterns = [
    url(r'^$', views.list, name='list'),
    url(r'^ver/(?P<slug>[\w-]+)/$', views.detail, name='detail'),
]
