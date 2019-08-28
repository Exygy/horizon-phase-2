# Generated by Django 2.1 on 2019-06-27 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0006_auto_20190627_0147'),
    ]

    operations = [
        migrations.AddField(
            model_name='step',
            name='private_field_1',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Private field 1'),
        ),
        migrations.AddField(
            model_name='step',
            name='private_field_1_meta_description',
            field=models.CharField(blank=True, max_length=128, null=True,
                                   verbose_name='Private field 1 Meta Description'),
        ),
        migrations.AddField(
            model_name='step',
            name='private_field_2',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Private field 2'),
        ),
        migrations.AddField(
            model_name='step',
            name='private_field_2_meta_description',
            field=models.CharField(blank=True, max_length=128, null=True,
                                   verbose_name='Private field 2 Meta Description'),
        ),
        migrations.AddField(
            model_name='step',
            name='private_field_3',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Private field 3'),
        ),
        migrations.AddField(
            model_name='step',
            name='private_field_3_meta_description',
            field=models.CharField(blank=True, max_length=128, null=True,
                                   verbose_name='Private field 3 Meta Description'),
        ),
    ]
