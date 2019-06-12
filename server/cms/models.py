from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=128)


class Challenge(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Step(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    title_md_en = models.CharField(max_length=256, verbose_name='Title (english)')
    description_md_en = models.CharField(max_length=512, verbose_name='Description (english)')
    call_to_action_md_en = models.CharField(max_length=256, verbose_name='Call to action (english)')

    title_md_es = models.CharField(max_length=256, blank=True, null=True, verbose_name='Title (spanish)')
    description_md_es = models.CharField(max_length=512, blank=True, null=True, verbose_name='Description (spanish)')
    call_to_action_md_es = models.CharField(max_length=256, blank=True, null=True, verbose_name='Call to action (spanish)')

    title_md_cn = models.CharField(max_length=256, blank=True, null=True, verbose_name='Title (chinese)')
    description_md_cn = models.CharField(max_length=512, blank=True, null=True, verbose_name='Description (chinese)')
    call_to_action_md_cn = models.CharField(max_length=256, blank=True, null=True, verbose_name='Call to action (chinese)')

    def __str__(self):
        return self.title_md_en
