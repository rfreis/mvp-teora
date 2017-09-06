from django import forms

from .models import (
    Agendamento,
    )

class AgendamentoForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(AgendamentoForm, self).__init__(*args, **kwargs)
        self.fields['nome'].widget.attrs['placeholder'] = 'Nome'
        self.fields['nome'].widget.attrs['class'] = 'form-control'
        self.fields['telefone'].widget.attrs['placeholder'] = 'Telefone'
        self.fields['telefone'].widget.attrs['class'] = 'form-control'
        self.fields['email'].widget.attrs['placeholder'] = 'Email'
        self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['atividade_info'].label = 'Atividade'
        self.fields['atividade_info'].widget.attrs['class'] = 'form-control'

    class Meta:
        model = Agendamento
        fields = ['nome', 'telefone', 'email', 'atividade_info']
