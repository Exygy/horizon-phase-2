from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea

from .models import Step


class StepAdmin(admin.ModelAdmin):
    readonly_fields = [
        "challenge",
        "public_field_1_meta_description", 
        "public_field_2_meta_description", 
        "public_field_3_meta_description", 
        "public_field_4_meta_description", 
        "public_field_5_meta_description", 
        "public_field_6_meta_description", 
        "public_field_7_meta_description", 
        "public_field_8_meta_description", 
        "public_field_9_meta_description", 
        "public_field_10_meta_description", 
        "public_field_11_meta_description", 
        "public_field_12_meta_description", 
        "public_field_13_meta_description", 
        "public_field_14_meta_description", 
        "public_field_15_meta_description", 
        "public_field_16_meta_description", 
    ]
    list_display = ('id', 'get_category', 'get_challenge', )
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':3, 'cols':80})},
    }
    fields = (
            'public_field_1_meta_description', 'public_field_1_en', 'public_field_1_es', 'public_field_1_cn',
            'public_field_2_meta_description', 'public_field_2_en', 'public_field_2_es', 'public_field_2_cn',
            'public_field_3_meta_description', 'public_field_3_en', 'public_field_3_es', 'public_field_3_cn',
            'public_field_4_meta_description', 'public_field_4_en', 'public_field_4_es', 'public_field_4_cn',
            'public_field_5_meta_description', 'public_field_5_en', 'public_field_5_es', 'public_field_5_cn',
            'public_field_6_meta_description', 'public_field_6_en', 'public_field_6_es', 'public_field_6_cn',
            'public_field_7_meta_description', 'public_field_7_en', 'public_field_7_es', 'public_field_7_cn',
            'public_field_8_meta_description', 'public_field_8_en', 'public_field_8_es', 'public_field_8_cn',
            'public_field_9_meta_description', 'public_field_9_en', 'public_field_9_es', 'public_field_9_cn',
            'public_field_10_meta_description', 'public_field_10_en', 'public_field_10_es', 'public_field_10_cn',
            'public_field_11_meta_description', 'public_field_11_en', 'public_field_11_es', 'public_field_11_cn',
            'public_field_12_meta_description', 'public_field_12_en', 'public_field_12_es', 'public_field_12_cn',
            'public_field_13_meta_description', 'public_field_13_en', 'public_field_13_es', 'public_field_13_cn',
            'public_field_14_meta_description', 'public_field_14_en', 'public_field_14_es', 'public_field_14_cn',
            'public_field_15_meta_description', 'public_field_15_en', 'public_field_15_es', 'public_field_15_cn',
            'public_field_16_meta_description', 'public_field_16_en', 'public_field_16_es', 'public_field_16_cn',
            )

    ordering = ('id', 'challenge__category__name', 'challenge__name', )
    exclude = ('private_field_1', 'private_field_1_meta_description', 'private_field_2', 'private_field_2_meta_description', 'private_field_3', 'private_field_3_meta_description', )
      
    def get_category(self, obj):
        return obj.challenge.category.name 

    def get_challenge(self, obj):
        return obj.challenge.name

    get_category.short_description = 'Category'
    get_challenge.short_description = 'Challenge'

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Step, StepAdmin)
