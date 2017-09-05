from django.db import models
from django.db.models.signals import pre_save
from django.utils.text import slugify
import os

class Atividade(models.Model):
    nome = models.CharField(max_length=40)
    slug = models.SlugField(unique=True, blank=True, null=True)
    foto = models.FileField(upload_to='home/static/uploads/')
    descricao = models.TextField()

    def __str__(self):
        return self.nome

    def get_foto_url(self):
        foto_url = os.path.basename(self.foto.name)
        foto_url = '/assets/uploads/' + foto_url
        return foto_url


class AtividadeInfo(models.Model):
    atividade = models.ForeignKey(Atividade)
    horario = models.CharField(max_length=40, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    endereco = models.CharField(max_length=100)

    def __str__(self):
        return '%s - %s - %s' % (self.atividade.nome, self.horario, self.endereco)

def create_slug(instance, new_slug=None):
    slug = slugify(instance.nome)
    if new_slug is not None:
        slug = new_slug
    qs = Atividade.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)

pre_save.connect(pre_save_post_receiver, sender=Atividade)
