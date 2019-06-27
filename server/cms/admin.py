from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea

from .models import Step


class StepAdmin(admin.ModelAdmin):
    readonly_fields = ["challenge"]
    list_display = ('id', 'get_category', 'get_challenge', )
    formfield_overrides = {
        models.CharField: {'widget': Textarea(attrs={'rows':3, 'cols':80})},
    }

    ordering = ('id', 'challenge__category__name', 'challenge__name', )
      
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
