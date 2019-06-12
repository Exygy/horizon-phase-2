from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea

from .models import Step


class StepAdmin(admin.ModelAdmin):
    readonly_fields = ["order", "challenge"]
    list_display = ('get_edit_link', 'get_category', 'get_challenge', 'order', 'title_md_en', 'description_md_en', 'call_to_action_md_en', )
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':3, 'cols':80})},
    }

    def get_edit_link(self, obj):
        return 'Edit Step'
      
    def get_category(self, obj):
        return obj.challenge.category.name 

    def get_challenge(self, obj):
        return obj.challenge.name

    get_category.short_description = 'Category'
    get_challenge.short_description = 'Challenge'
    get_edit_link.short_description = 'Edit'

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Step, StepAdmin)
