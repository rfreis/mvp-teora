from django.shortcuts import render

def list(request):
    context = {}
    return render(request, 'atividade/list.html', context)

def detail(request, slug):
    context = {}
    return render(request, 'atividade/detail.html', context)
