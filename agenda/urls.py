from django.conf.urls import url
from . import views

app_name = 'agenda'

urlpatterns = [
    url(r'^$', views.form, name='form'),
    url(r'^submit/$', views.submit, name='submit'),
    #url(r'^ver/(?P<slug>[\w-]+)/$', views.detail, name='detail'),
]
