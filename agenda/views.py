from django.shortcuts import (
    get_object_or_404,
    render
    )

from .forms import (
    AgendamentoForm,
    )

from .models import (
    Agendamento,
    )

from atividade.models import (
    Atividade,
    AtividadeInfo
    )

def form(request):
    atividade_info_id = request.GET.get('atividade_info_id')
    atividade_info = None
    if atividade_info_id is not None:
        atividade_info = AtividadeInfo.objects.filter(id=atividade_info_id).first()
    form = AgendamentoForm(request.POST or None, initial={'atividade_info': atividade_info})
    context = {
        'atividade_info': atividade_info,
        'form': form,
    }
    return render(request, 'agenda/form.html', context)

def submit(request):
    form = AgendamentoForm(request.POST or None)
    context = {
        'form': form,
    }
    if request.method == 'POST' and form.is_valid():
        agendamento = form.save(commit=False)
        agendamento.atividade_info = form.cleaned_data['atividade_info']
        agendamento.nome = form.cleaned_data['nome']
        agendamento.telefone = form.cleaned_data['telefone']
        agendamento.email = form.cleaned_data['email']
        agendamento.save()
        context.update({
            'agendamento': agendamento,
        })
        return render(request, 'agenda/obrigado.html', context)
    return render(request, 'agenda/form.html', context)
