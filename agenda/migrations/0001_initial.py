# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-09-04 14:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('atividade', '0004_auto_20170904_1430'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agendamento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=40)),
                ('telefone', models.CharField(max_length=40)),
                ('atividade_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='atividade.AtividadeInfo')),
            ],
        ),
    ]