# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-09-04 14:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Atividade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.IntegerField(choices=[(0, 'Yoga'), (1, 'Alongamento')])),
                ('foto', models.FileField(upload_to='uploads/')),
                ('descricao', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='AtividadeInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('horario', models.CharField(blank=True, max_length=40)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=2)),
                ('endereco', models.CharField(max_length=100)),
                ('atividade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='atividade.Atividade')),
            ],
        ),
    ]
