from django.shortcuts import render

from atividade.models import (
    Atividade,
    AtividadeInfo
    )

# Create your views here.
def index(request):
    atividade = Atividade.objects.all().order_by('nome')
    context = {
        'atividade': atividade,
    }
    return render(request, 'home/base.html', context)
