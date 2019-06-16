from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Challenge(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Step(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    title_md_en = models.CharField(max_length=256, verbose_name='Title (english)', blank=True, null=True)
    description_md_en = models.CharField(max_length=512, verbose_name='Description (english)', blank=True, null=True)
    call_to_action_md_en = models.CharField(max_length=256, verbose_name='Call to action (english)', blank=True, null=True)
    strategy_field_1_en = models.CharField(max_length=256, verbose_name='Strategy field 1 (english)', blank=True, null=True)
    strategy_field_2_en = models.CharField(max_length=256, verbose_name='Strategy field 2 (english)', blank=True, null=True)
    strategy_field_3_en = models.CharField(max_length=256, verbose_name='Strategy field 3 (english)', blank=True, null=True)

    title_md_es = models.CharField(max_length=256, blank=True, null=True, verbose_name='Title (spanish)')
    description_md_es = models.CharField(max_length=512, blank=True, null=True, verbose_name='Description (spanish)')
    call_to_action_md_es = models.CharField(max_length=256, blank=True, null=True, verbose_name='Call to action (spanish)')
    strategy_field_1_es = models.CharField(max_length=256, verbose_name='Strategy field 1 (spanish)', blank=True, null=True)
    strategy_field_2_es = models.CharField(max_length=256, verbose_name='Strategy field 2 (spanish)', blank=True, null=True)
    strategy_field_3_es = models.CharField(max_length=256, verbose_name='Strategy field 3 (spanish)', blank=True, null=True)

    title_md_cn = models.CharField(max_length=256, blank=True, null=True, verbose_name='Title (chinese)')
    description_md_cn = models.CharField(max_length=512, blank=True, null=True, verbose_name='Description (chinese)')
    call_to_action_md_cn = models.CharField(max_length=256, blank=True, null=True, verbose_name='Call to action (chinese)')
    strategy_field_1_cn = models.CharField(max_length=256, verbose_name='Strategy field 1 (chinese)', blank=True, null=True)
    strategy_field_2_cn = models.CharField(max_length=256, verbose_name='Strategy field 2 (chinese)', blank=True, null=True)
    strategy_field_3_cn = models.CharField(max_length=256, verbose_name='Strategy field 3 (chinese)', blank=True, null=True)

    def __str__(self):
        return self.title_md_en
