from django.shortcuts import (
    get_object_or_404,
    render
    )

from .models import (
    Atividade,
    AtividadeInfo
    )

def list(request):
    atividade = atividade = Atividade.objects.all().order_by('nome')
    context = {
        'atividade': atividade,
    }
    return render(request, 'atividade/list.html', context)

def detail(request, slug):
    atividade = get_object_or_404(Atividade, slug=slug)
    atividade_info = AtividadeInfo.objects.filter(atividade__slug=slug).order_by('horario')
    context = {
        'atividade': atividade,
        'atividade_info': atividade_info,
    }
    return render(request, 'atividade/detail.html', context)
