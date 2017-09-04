from django.db import models

from atividade.models import AtividadeInfo

class Agendamento(models.Model):
    atividade_info = models.ForeignKey(AtividadeInfo)
    nome = models.CharField(max_length=40)
    telefone = models.CharField(max_length=40)

    def __str__(self):
        return '%s - %s' % (self.nome, self.atividade_info.atividade.nome)
