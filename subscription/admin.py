from typing import Any
from django.contrib import admin
from django.db.models.fields import Field
from django.http import HttpRequest
from .models import Subscr

from django import forms

# Register your models here.

@admin.register(Subscr)
class SubscrAdmin(admin.ModelAdmin):
    #fields which can be viewed by admin
    list_display = ['id', 'userName', 'userEmail', 'userMobileNo', 'plan_period', 'plan_option', 'get_plan_price', 'add_on', 'get_add_on_prices', 'get_totalCost'] 

    #fields which can be edited by admin
    fields = ('userName', 'userEmail', 'userMobileNo', 'plan_period', 'plan_option', 'add_on', 'arcadeYearly', 'arcadeMonthly', 'advancedYearly', 'advancedMonthly', 'proYearly', 'proMonthly', 'onlineServicesYearly')

    # This ensures the displayed price is non-editable, but the admin can still update individual prices
    readonly_fields = ['get_plan_price', 'get_add_on_prices', 'get_totalCost']

    #add _on to display as checkbox
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == 'add_on':
            kwargs['widget'] = forms.CheckboxSelectMultiple(choices=Subscr.ADD_ON)
        return super().formfield_for_dbfield(db_field, request, **kwargs)