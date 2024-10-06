from django import forms
from .models import Subscr

class StepOneForm(forms.ModelForm):
    class Meta:
        model = Subscr
        fields = ['userName', 'userEmail', 'userMobileNo']
        widgets = {
            'userName': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Stephen King'}),
            'userEmail': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. stephenking@gmail.com'}),
            'userMobileNo': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. +2349057339147'})
        }

class StepTwoForm(forms.ModelForm):
    class Meta:
        model = Subscr
        fields = ['plan_period', 'plan_option']
        widgets = {
            'plan_period': forms.RadioSelect(attrs={'class': 'form-check-input'}),
            'plan_option': forms.RadioSelect(attrs={'class': 'form-check-input'}),
        }

class StepThreeForm(forms.ModelForm):
    add_on = forms.MultipleChoiceField(
        choices=Subscr.ADD_ON,
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    class Meta:
        model = Subscr
        fields = ['add_on']

        def clean_add_on(self):
            return self.cleaned_data['add_on']
        # Return the cleaned 'add_ons' data. This method simply returns the cleaned data for 'add_ons'. Extend it for custom validation if needed.Returns: list: The cleaned 'add_ons' data.
        
        def save(self, commit=True):
            subscr = super().save(commit=False)
            subscr.set_add_ons(self.cleaned_data['add_ons'])
            if commit:
                subscr.save()
                return subscr
    # """Save the form data to a Product instance. This method processes the 'add_ons' field and saves the Subrsc instance if `commit` is True. Args: commit (bool): If True, save the instance to the database. If False, only create the instance. Returns: Subscr: The Subsc instance.
    