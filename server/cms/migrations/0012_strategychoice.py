# Generated by Django 2.1 on 2019-06-30 22:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0011_surveyresponse'),
    ]

    operations = [
        migrations.CreateModel(
            name='StrategyChoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('clip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cms.Step')),
            ],
        ),
    ]