import pytz

from django.conf import settings
from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ExportMixin
from import_export.fields import Field

from .models import Category, CategoryFeedback, Challenge, StrategyChoice, Step, SurveyResponse


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
        "public_field_20_meta_description",
        "public_field_21_meta_description",
        "public_field_22_meta_description",
        "public_field_23_meta_description",
        "public_field_24_meta_description",
    ]
    list_display = ('id', 'get_category', 'get_challenge', )
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows': 3, 'cols': 80})},
    }
    fields = (
        "id", 'get_category', 'get_challenge',
    )

    ordering = ('id', 'challenge__category__name', 'challenge__name', )
    exclude = ('private_field_1', 'private_field_1_meta_description', 'private_field_2',
               'private_field_2_meta_description', 'private_field_3', 'private_field_3_meta_description', )

    def check_if_used(self, field):
        return field and field != 'DO NOT USE'

    def get_fields(self, request, obj=None):
        fields = self.fields

        if self.check_if_used(obj.public_field_1_meta_description):
            fields = fields + ('public_field_1_meta_description', 'public_field_1_en',
                               'public_field_1_es', 'public_field_1_cn',)
        if self.check_if_used(obj.public_field_2_meta_description):
            fields = fields + ('public_field_2_meta_description', 'public_field_2_en',
                               'public_field_2_es', 'public_field_2_cn',)
        if self.check_if_used(obj.public_field_3_meta_description):
            fields = fields + ('public_field_3_meta_description', 'public_field_3_en',
                               'public_field_3_es', 'public_field_3_cn',)
        if self.check_if_used(obj.public_field_4_meta_description):
            fields = fields + ('public_field_4_meta_description', 'public_field_4_en',
                               'public_field_4_es', 'public_field_4_cn',)
        if self.check_if_used(obj.public_field_5_meta_description):
            fields = fields + ('public_field_5_meta_description', 'public_field_5_en',
                               'public_field_5_es', 'public_field_5_cn',)
        if self.check_if_used(obj.public_field_6_meta_description):
            fields = fields + ('public_field_6_meta_description', 'public_field_6_en',
                               'public_field_6_es', 'public_field_6_cn',)
        if self.check_if_used(obj.public_field_7_meta_description):
            fields = fields + ('public_field_7_meta_description', 'public_field_7_en',
                               'public_field_7_es', 'public_field_7_cn',)
        if self.check_if_used(obj.public_field_8_meta_description):
            fields = fields + ('public_field_8_meta_description', 'public_field_8_en',
                               'public_field_8_es', 'public_field_8_cn',)
        if self.check_if_used(obj.public_field_9_meta_description):
            fields = fields + ('public_field_9_meta_description', 'public_field_9_en',
                               'public_field_9_es', 'public_field_9_cn',)
        if self.check_if_used(obj.public_field_10_meta_description):
            fields = fields + ('public_field_10_meta_description', 'public_field_10_en',
                               'public_field_10_es', 'public_field_10_cn',)
        if self.check_if_used(obj.public_field_11_meta_description):
            fields = fields + ('public_field_11_meta_description', 'public_field_11_en',
                               'public_field_11_es', 'public_field_11_cn',)
        if self.check_if_used(obj.public_field_12_meta_description):
            fields = fields + ('public_field_12_meta_description', 'public_field_12_en',
                               'public_field_12_es', 'public_field_12_cn',)
        if self.check_if_used(obj.public_field_13_meta_description):
            fields = fields + ('public_field_13_meta_description', 'public_field_13_en',
                               'public_field_13_es', 'public_field_13_cn',)
        if self.check_if_used(obj.public_field_14_meta_description):
            fields = fields + ('public_field_14_meta_description', 'public_field_14_en',
                               'public_field_14_es', 'public_field_14_cn',)
        if self.check_if_used(obj.public_field_15_meta_description):
            fields = fields + ('public_field_15_meta_description', 'public_field_15_en',
                               'public_field_15_es', 'public_field_15_cn',)
        if self.check_if_used(obj.public_field_16_meta_description):
            fields = fields + ('public_field_16_meta_description', 'public_field_16_en',
                               'public_field_16_es', 'public_field_16_cn',)
        if self.check_if_used(obj.public_field_17_meta_description):
            fields = fields + ('public_field_17_meta_description', 'public_field_17_en',
                               'public_field_17_es', 'public_field_17_cn',)
        if self.check_if_used(obj.public_field_18_meta_description):
            fields = fields + ('public_field_18_meta_description', 'public_field_18_en',
                               'public_field_18_es', 'public_field_18_cn',)
        if self.check_if_used(obj.public_field_19_meta_description):
            fields = fields + ('public_field_19_meta_description', 'public_field_19_en',
                               'public_field_19_es', 'public_field_19_cn',)
        if self.check_if_used(obj.public_field_20_meta_description):
            fields = fields + ('public_field_20_meta_description', 'public_field_20_en',
                               'public_field_20_es', 'public_field_20_cn',)
        if self.check_if_used(obj.public_field_21_meta_description):
            fields = fields + ('public_field_21_meta_description', 'public_field_21_en',
                               'public_field_21_es', 'public_field_21_cn',)
        if self.check_if_used(obj.public_field_22_meta_description):
            fields = fields + ('public_field_22_meta_description', 'public_field_22_en',
                               'public_field_22_es', 'public_field_22_cn',)
        if self.check_if_used(obj.public_field_23_meta_description):
            fields = fields + ('public_field_23_meta_description', 'public_field_23_en',
                               'public_field_23_es', 'public_field_23_cn',)
        if self.check_if_used(obj.public_field_24_meta_description):
            fields = fields + ('public_field_24_meta_description', 'public_field_24_en',
                               'public_field_24_es', 'public_field_24_cn',)

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
    choice = Field()
    category = Field(attribute='step__challenge__category__name', column_name='category')
    challenge = Field(attribute='step__challenge__name', column_name='challenge')
    date_updated = Field()

    class Meta:
        model = StrategyChoice
        fields = ('id', 'session_id', 'category', 'challenge', 'choice', 'date_updated', )
        export_order = ('id', 'session_id', 'category', 'challenge', 'choice', 'date_updated', )

    def dehydrate_date_updated(self, strategy_choice):
        return strategy_choice.date_updated.astimezone(pytz.timezone(settings.ZONE)).strftime('%B %-d, %Y %-I:%M:%S %p')

    def dehydrate_choice(self, strategy_choice):
        if strategy_choice.step.id in [103,204,308,404,508, 608, 704, 806, 906, 1006, 1106]:
            return strategy_choice.origin_step.public_field_2_en
        elif strategy_choice.step.id in [104,205,309, 405, 509, 609, 705, 807, 907, 1007, 1107]:
            return strategy_choice.origin_step.public_field_8_en
        elif strategy_choice.step.id in [105, 510, 808, 908, 1008, 1108]:
            return strategy_choice.origin_step.public_field_14_en


class SurveyResponseResource(resources.ModelResource):
    date_updated = Field()

    class Meta:
        model = SurveyResponse
        export_order = ('id', 'session_id', 'name', 'date_updated')

    def dehydrate_date_updated(self, strategy_choice):
        return strategy_choice.date_updated.astimezone(pytz.timezone(settings.ZONE)).strftime('%B %-d, %Y %-I:%M:%S %p')


class SurveyResponseAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = SurveyResponseResource
    list_display_links = None
    list_display = ('session_id', 'zipcode', 'date_updated', )
    ordering = ('-date_updated', )

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class StrategyChoiceAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = StrategyChoiceResource
    list_display_links = None
    list_display = ('id', 'session_id', 'get_category', 'get_challenge', 'get_choice_desc', 'date_updated', )
    ordering = ('-date_updated', )

    def get_category(self, obj):
        return obj.step.challenge.category.name

    def get_challenge(self, obj):
        return obj.step.challenge.name

    def get_choice_desc(self, obj):
        if obj.step.id in [103,204,308,404,508, 608, 704, 806, 906, 1006, 1106]:
            return obj.origin_step.public_field_2_en
        elif obj.step.id in [104,205,309, 405, 509, 609, 705, 807, 907, 1007, 1107]:
            return obj.origin_step.public_field_8_en
        elif obj.step.id in [105, 510, 808, 908, 1008, 1108]:
            return obj.origin_step.public_field_14_en

    get_choice_desc.short_description = 'Choice'
    get_category.short_description = 'Category'
    get_challenge.short_description = 'Challenge'

    def has_add_permission(self, request, obj=None):
        return False

    """
    def has_delete_permission(self, request, obj=None):
        return False
    """


class CategoryFeedbackResource(resources.ModelResource):
    date_updated = Field()

    class Meta:
        model = CategoryFeedback
        export_order = ('id', 'session_id', 'step', 'text', 'date_updated')

    def dehydrate_date_updated(self, category_feedback):
        return category_feedback.date_updated.astimezone(pytz.timezone(settings.ZONE)).strftime('%B %-d, %Y %-I:%M:%S %p')


class CategoryFeedbackAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = CategoryFeedbackResource
    list_display_links = None
    list_display = ('session_id', 'get_category', 'text', 'date_updated', )
    ordering = ('-date_updated', )

    def get_category(self, obj):
        return obj.step.challenge.category

    get_category.short_description = 'Category'

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Step, StepAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Challenge, ChallengeAdmin)
admin.site.register(SurveyResponse, SurveyResponseAdmin)
admin.site.register(StrategyChoice, StrategyChoiceAdmin)
admin.site.register(CategoryFeedback, CategoryFeedbackAdmin)
