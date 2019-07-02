from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ExportMixin
from import_export.fields import Field

from .models import Category, Challenge, StrategyChoice, Step, SurveyResponse


class StepAdmin(admin.ModelAdmin):
    readonly_fields = [
        "id",
        "get_category",
        "get_challenge",
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
        "public_field_17_meta_description", 
        "public_field_18_meta_description", 
        "public_field_19_meta_description", 
    ]
    list_display = ('id', 'get_category', 'get_challenge', )
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':3, 'cols':80})},
    }
    fields = (
            "id", 'get_category', 'get_challenge', 
            )

    ordering = ('id', 'challenge__category__name', 'challenge__name', )
    exclude = ('private_field_1', 'private_field_1_meta_description', 'private_field_2', 'private_field_2_meta_description', 'private_field_3', 'private_field_3_meta_description', )

    def get_fields(self, request, obj=None):
        fields = self.fields

        if obj.public_field_1_meta_description:
            fields = fields + ('public_field_1_meta_description', 'public_field_1_en', 'public_field_1_es', 'public_field_1_cn',)
        if obj.public_field_2_meta_description:
            fields =  fields + ('public_field_2_meta_description', 'public_field_2_en', 'public_field_2_es', 'public_field_2_cn',)
        if obj.public_field_3_meta_description:
            fields =  fields + ('public_field_3_meta_description', 'public_field_3_en', 'public_field_3_es', 'public_field_3_cn',)
        if obj.public_field_4_meta_description:
            fields =  fields + ('public_field_4_meta_description', 'public_field_4_en', 'public_field_4_es', 'public_field_4_cn',)
        if obj.public_field_5_meta_description:
            fields =  fields + ('public_field_5_meta_description', 'public_field_5_en', 'public_field_5_es', 'public_field_5_cn',)
        if obj.public_field_6_meta_description:
            fields =  fields + ('public_field_6_meta_description', 'public_field_6_en', 'public_field_6_es', 'public_field_6_cn',)
        if obj.public_field_7_meta_description:
            fields =  fields + ('public_field_7_meta_description', 'public_field_7_en', 'public_field_7_es', 'public_field_7_cn',)
        if obj.public_field_8_meta_description:
            fields =  fields + ('public_field_8_meta_description', 'public_field_8_en', 'public_field_8_es', 'public_field_8_cn',)
        if obj.public_field_9_meta_description:
            fields =  fields + ('public_field_9_meta_description', 'public_field_9_en', 'public_field_9_es', 'public_field_9_cn',)
        if obj.public_field_10_meta_description:
            fields =  fields + ('public_field_10_meta_description', 'public_field_10_en', 'public_field_10_es', 'public_field_10_cn',)
        if obj.public_field_11_meta_description:
            fields =  fields + ('public_field_11_meta_description', 'public_field_11_en', 'public_field_11_es', 'public_field_11_cn',)
        if obj.public_field_12_meta_description:
            fields =  fields + ('public_field_12_meta_description', 'public_field_12_en', 'public_field_12_es', 'public_field_12_cn',)
        if obj.public_field_13_meta_description:
            fields =  fields + ('public_field_13_meta_description', 'public_field_13_en', 'public_field_13_es', 'public_field_13_cn',)
        if obj.public_field_14_meta_description:
            fields =  fields + ('public_field_14_meta_description', 'public_field_14_en', 'public_field_14_es', 'public_field_14_cn',)
        if obj.public_field_15_meta_description:
            fields =  fields + ('public_field_15_meta_description', 'public_field_15_en', 'public_field_15_es', 'public_field_15_cn',)
        if obj.public_field_16_meta_description:
            fields =  fields + ('public_field_16_meta_description', 'public_field_16_en', 'public_field_16_es', 'public_field_16_cn',)
        if obj.public_field_17_meta_description:
            fields =  fields + ('public_field_17_meta_description', 'public_field_17_en', 'public_field_17_es', 'public_field_17_cn',)
        if obj.public_field_18_meta_description:
            fields =  fields + ('public_field_18_meta_description', 'public_field_18_en', 'public_field_18_es', 'public_field_18_cn',)
        if obj.public_field_19_meta_description:
            fields =  fields + ('public_field_19_meta_description', 'public_field_19_en', 'public_field_19_es', 'public_field_19_cn',)

        return fields
      
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


class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = [
        "name",
    ]

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class ChallengeAdmin(admin.ModelAdmin):
    readonly_fields = [
        "name",
        "category",
    ]

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class StrategyChoiceResource(resources.ModelResource):
    choice = Field(attribute='step__public_field_2_en', column_name='choice')

    class Meta:
        model = StrategyChoice
        fields = ('id', 'session_id', 'date_updated', 'choice', )
        export_order = ('id', 'session_id', 'choice', 'date_updated')


class SurveyResponseResource(resources.ModelResource):
    class Meta:
        model = SurveyResponse


class SurveyResponseAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = SurveyResponseResource
    list_display_links = None
    list_display = ('session_id', 'name', 'date_updated', )

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class StrategyChoiceAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = StrategyChoiceResource
    list_display_links = None
    list_display = ('session_id', 'get_choice_desc', 'date_updated', )

    def get_choice_desc(self, obj):
        return obj.step.public_field_2_en

    get_choice_desc.short_description = 'Choice'

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Step, StepAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Challenge, ChallengeAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)
admin.site.register(StrategyChoice, StrategyChoiceAdmin)
