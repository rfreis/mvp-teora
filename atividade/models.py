from django.db import models

class Atividade(models.Model):
    nome = models.CharField(max_length=40)
    foto = models.FileField(upload_to='uploads/')
    descricao = models.TextField()

    def __str__(self):
        return self.nome

class AtividadeInfo(models.Model):
    atividade = models.ForeignKey(Atividade)
    horario = models.CharField(max_length=40, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    endereco = models.CharField(max_length=100)

    def __str__(self):
        return '%s - %s - %s' % (self.atividade.nome, self.horario, self.endereco)
