from django.db import models


class SurveyResponse(models.Model):
    name = models.CharField(max_length=256, null=True, blank=True)
    session_id = models.UUIDField(null=True, blank=True)
    date_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class StrategyChoice(models.Model):
    origin_step = models.ForeignKey('Step', on_delete=models.CASCADE, related_name='origin')
    step = models.ForeignKey('Step', on_delete=models.CASCADE)
    session_id = models.UUIDField(null=True, blank=True)
    date_updated = models.DateTimeField(auto_now_add=True)


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

    public_field_1_en = models.CharField(max_length=1024, verbose_name='Public field 1 (English)', blank=True, null=True)
    public_field_1_es = models.CharField(max_length=1024, verbose_name='Public field 1 (Spanish)', blank=True, null=True)
    public_field_1_cn = models.CharField(max_length=1024, verbose_name='Public field 1 (Chinese)', blank=True, null=True)
    public_field_1_meta_description = models.CharField(max_length=128, verbose_name='Public field 1 Meta Description', blank=True, null=True)

    public_field_2_en = models.CharField(max_length=1024, verbose_name='Public field 2 (English)', blank=True, null=True)
    public_field_2_es = models.CharField(max_length=1024, verbose_name='Public field 2 (Spanish)', blank=True, null=True)
    public_field_2_cn = models.CharField(max_length=1024, verbose_name='Public field 2 (Chinese)', blank=True, null=True)
    public_field_2_meta_description = models.CharField(max_length=128, verbose_name='Public field 2 Meta Description', blank=True, null=True)

    public_field_3_en = models.CharField(max_length=1024, verbose_name='Public field 3 (English)', blank=True, null=True)
    public_field_3_es = models.CharField(max_length=1024, verbose_name='Public field 3 (Spanish)', blank=True, null=True)
    public_field_3_cn = models.CharField(max_length=1024, verbose_name='Public field 3 (Chinese)', blank=True, null=True)
    public_field_3_meta_description = models.CharField(max_length=128, verbose_name='Public field 3 Meta Description', blank=True, null=True)

    public_field_4_en = models.CharField(max_length=1024, verbose_name='Public field 4 (English)', blank=True, null=True)
    public_field_4_es = models.CharField(max_length=1024, verbose_name='Public field 4 (Spanish)', blank=True, null=True)
    public_field_4_cn = models.CharField(max_length=1024, verbose_name='Public field 4 (Chinese)', blank=True, null=True)
    public_field_4_meta_description = models.CharField(max_length=128, verbose_name='Public field 4 Meta Description', blank=True, null=True)

    public_field_5_en = models.CharField(max_length=1024, verbose_name='Public field 5 (English)', blank=True, null=True)
    public_field_5_es = models.CharField(max_length=1024, verbose_name='Public field 5 (Spanish)', blank=True, null=True)
    public_field_5_cn = models.CharField(max_length=1024, verbose_name='Public field 5 (Chinese)', blank=True, null=True)
    public_field_5_meta_description = models.CharField(max_length=128, verbose_name='Public field 5 Meta Description', blank=True, null=True)

    public_field_6_en = models.CharField(max_length=1024, verbose_name='Public field 6 (English)', blank=True, null=True)
    public_field_6_es = models.CharField(max_length=1024, verbose_name='Public field 6 (Spanish)', blank=True, null=True)
    public_field_6_cn = models.CharField(max_length=1024, verbose_name='Public field 6 (Chinese)', blank=True, null=True)
    public_field_6_meta_description = models.CharField(max_length=128, verbose_name='Public field 6 Meta Description', blank=True, null=True)

    public_field_7_en = models.CharField(max_length=1024, verbose_name='Public field 7 (English)', blank=True, null=True)
    public_field_7_es = models.CharField(max_length=1024, verbose_name='Public field 7 (Spanish)', blank=True, null=True)
    public_field_7_cn = models.CharField(max_length=1024, verbose_name='Public field 7 (Chinese)', blank=True, null=True)
    public_field_7_meta_description = models.CharField(max_length=128, verbose_name='Public field 7 Meta Description', blank=True, null=True)

    public_field_8_en = models.CharField(max_length=1024, verbose_name='Public field 8 (English)', blank=True, null=True)
    public_field_8_es = models.CharField(max_length=1024, verbose_name='Public field 8 (Spanish)', blank=True, null=True)
    public_field_8_cn = models.CharField(max_length=1024, verbose_name='Public field 8 (Chinese)', blank=True, null=True)
    public_field_8_meta_description = models.CharField(max_length=128, verbose_name='Public field 8 Meta Description', blank=True, null=True)

    public_field_9_en = models.CharField(max_length=1024, verbose_name='Public field 9 (English)', blank=True, null=True)
    public_field_9_es = models.CharField(max_length=1024, verbose_name='Public field 9 (Spanish)', blank=True, null=True)
    public_field_9_cn = models.CharField(max_length=1024, verbose_name='Public field 9 (Chinese)', blank=True, null=True)
    public_field_9_meta_description = models.CharField(max_length=128, verbose_name='Public field 9 Meta Description', blank=True, null=True)

    public_field_10_en = models.CharField(max_length=1024, verbose_name='Public field 10 (English)', blank=True, null=True)
    public_field_10_es = models.CharField(max_length=1024, verbose_name='Public field 10 (Spanish)', blank=True, null=True)
    public_field_10_cn = models.CharField(max_length=1024, verbose_name='Public field 10 (Chinese)', blank=True, null=True)
    public_field_10_meta_description = models.CharField(max_length=128, verbose_name='Public field 10 Meta Description', blank=True, null=True)

    public_field_11_en = models.CharField(max_length=1024, verbose_name='Public field 11 (English)', blank=True, null=True)
    public_field_11_es = models.CharField(max_length=1024, verbose_name='Public field 11 (Spanish)', blank=True, null=True)
    public_field_11_cn = models.CharField(max_length=1024, verbose_name='Public field 11 (Chinese)', blank=True, null=True)
    public_field_11_meta_description = models.CharField(max_length=128, verbose_name='Public field 11 Meta Description', blank=True, null=True)

    public_field_12_en = models.CharField(max_length=1024, verbose_name='Public field 12 (English)', blank=True, null=True)
    public_field_12_es = models.CharField(max_length=1024, verbose_name='Public field 12 (Spanish)', blank=True, null=True)
    public_field_12_cn = models.CharField(max_length=1024, verbose_name='Public field 12 (Chinese)', blank=True, null=True)
    public_field_12_meta_description = models.CharField(max_length=128, verbose_name='Public field 12 Meta Description', blank=True, null=True)

    public_field_13_en = models.CharField(max_length=1024, verbose_name='Public field 13 (English)', blank=True, null=True)
    public_field_13_es = models.CharField(max_length=1024, verbose_name='Public field 13 (Spanish)', blank=True, null=True)
    public_field_13_cn = models.CharField(max_length=1024, verbose_name='Public field 13 (Chinese)', blank=True, null=True)
    public_field_13_meta_description = models.CharField(max_length=128, verbose_name='Public field 13 Meta Description', blank=True, null=True)

    public_field_14_en = models.CharField(max_length=1024, verbose_name='Public field 14 (English)', blank=True, null=True)
    public_field_14_es = models.CharField(max_length=1024, verbose_name='Public field 14 (Spanish)', blank=True, null=True)
    public_field_14_cn = models.CharField(max_length=1024, verbose_name='Public field 14 (Chinese)', blank=True, null=True)
    public_field_14_meta_description = models.CharField(max_length=128, verbose_name='Public field 14 Meta Description', blank=True, null=True)

    public_field_15_en = models.CharField(max_length=1024, verbose_name='Public field 15 (English)', blank=True, null=True)
    public_field_15_es = models.CharField(max_length=1024, verbose_name='Public field 15 (Spanish)', blank=True, null=True)
    public_field_15_cn = models.CharField(max_length=1024, verbose_name='Public field 15 (Chinese)', blank=True, null=True)
    public_field_15_meta_description = models.CharField(max_length=128, verbose_name='Public field 15 Meta Description', blank=True, null=True)

    public_field_16_en = models.CharField(max_length=1024, verbose_name='Public field 16 (English)', blank=True, null=True)
    public_field_16_es = models.CharField(max_length=1024, verbose_name='Public field 16 (Spanish)', blank=True, null=True)
    public_field_16_cn = models.CharField(max_length=1024, verbose_name='Public field 16 (Chinese)', blank=True, null=True)
    public_field_16_meta_description = models.CharField(max_length=128, verbose_name='Public field 16 Meta Description', blank=True, null=True)

    public_field_17_en = models.CharField(max_length=1024, verbose_name='Public field 17 (English)', blank=True, null=True)
    public_field_17_es = models.CharField(max_length=1024, verbose_name='Public field 17 (Spanish)', blank=True, null=True)
    public_field_17_cn = models.CharField(max_length=1024, verbose_name='Public field 17 (Chinese)', blank=True, null=True)
    public_field_17_meta_description = models.CharField(max_length=128, verbose_name='Public field 17 Meta Description', blank=True, null=True)

    public_field_18_en = models.CharField(max_length=1024, verbose_name='Public field 18 (English)', blank=True, null=True)
    public_field_18_es = models.CharField(max_length=1024, verbose_name='Public field 18 (Spanish)', blank=True, null=True)
    public_field_18_cn = models.CharField(max_length=1024, verbose_name='Public field 18 (Chinese)', blank=True, null=True)
    public_field_18_meta_description = models.CharField(max_length=128, verbose_name='Public field 18 Meta Description', blank=True, null=True)

    public_field_19_en = models.CharField(max_length=1024, verbose_name='Public field 19 (English)', blank=True, null=True)
    public_field_19_es = models.CharField(max_length=1024, verbose_name='Public field 19 (Spanish)', blank=True, null=True)
    public_field_19_cn = models.CharField(max_length=1024, verbose_name='Public field 19 (Chinese)', blank=True, null=True)
    public_field_19_meta_description = models.CharField(max_length=128, verbose_name='Public field 19 Meta Description', blank=True, null=True)

    private_field_1 = models.CharField(max_length=1024, verbose_name='Private field 1', blank=True, null=True)
    private_field_1_meta_description = models.CharField(max_length=128, verbose_name='Private field 1 Meta Description', blank=True, null=True)

    private_field_2 = models.CharField(max_length=1024, verbose_name='Private field 2', blank=True, null=True)
    private_field_2_meta_description = models.CharField(max_length=128, verbose_name='Private field 2 Meta Description', blank=True, null=True)

    private_field_3 = models.CharField(max_length=1024, verbose_name='Private field 3', blank=True, null=True)
    private_field_3_meta_description = models.CharField(max_length=128, verbose_name='Private field 3 Meta Description', blank=True, null=True)
