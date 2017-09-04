from django.contrib import admin

from .models import (
    Atividade,
    AtividadeInfo
)

# Register your models here.
admin.site.register(Atividade)
admin.site.register(AtividadeInfo)
