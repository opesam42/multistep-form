from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from decimal import Decimal

# Create your models here.
class Subscr(models.Model):
    userName = models.CharField(max_length=50)
    userEmail = models.EmailField()
    userMobileNo = PhoneNumberField()
    PLAN_PERIOD =[
        ('yearly', 'Yearly'),
        ('monthly', 'Monthly')
    ]
    plan_period = models.CharField(max_length=50, choices=PLAN_PERIOD, default='monthly')
    
    PLAN_OPTION = [
        ('arcade', 'Arcade'),
        ('advanced', 'Advanced'),
        ('pro', 'Pro'),
    ]
    plan_option = models.CharField(max_length=50, choices=PLAN_OPTION, default='', blank=False, null=False)

    #prices for subscription
    arcadeMonthly = models.DecimalField(max_digits=5, decimal_places=2, default=9.00)
    arcadeYearly = models.DecimalField(max_digits=5, decimal_places=2, default=90.00)
    
    advancedMonthly = models.DecimalField(max_digits=5, decimal_places=2, default=12.00)
    advancedYearly = models.DecimalField(max_digits=5, decimal_places=2, default=120.00)

    proMonthly =   models.DecimalField(max_digits=5, decimal_places=2, default=15.00)
    proYearly =  models.DecimalField(max_digits=5, decimal_places=2, default=150.00)

    def get_plan_price(self):
        if self.plan_option == "arcade":
            return self.arcadeYearly if self.plan_period == "yearly" else self.arcadeMonthly 
        elif self.plan_option == "advanced":
            return self.advancedYearly if self.plan_period == "yearly" else self.advancedMonthly
        elif self.plan_option == "pro":
            return self.proYearly if self.plan_period == "yearly" else self.proMonthly

    ADD_ON = [
        ('online_services', 'Online services'),
        ('larger_storage', 'Larger storage'),
        ('customizable', 'Customizable profile')
    ]
    
    add_on = models.TextField(blank=True)


    onlineServicesMonthly = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)
    onlineServicesYearly = models.DecimalField(max_digits=5, decimal_places=2, default=10.00)

    largerStorageMonthly = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)
    largerStorageYearly = models.DecimalField(max_digits=5, decimal_places=2, default=10.00)

    customizableMonthly = models.DecimalField(max_digits=5, decimal_places=2, default=2.00)
    customizableYearly = models.DecimalField(max_digits=5, decimal_places=2, default=20.00)


    def get_add_on_prices(self):
        #Add_On Price
        prices = {
            'online_services': self.onlineServicesMonthly if self.plan_period == 'monthly' else self.onlineServicesYearly,
            'larger_storage': self.largerStorageMonthly if self.plan_period == 'monthly' else self.largerStorageYearly,
            'customizable': self.customizableMonthly if self.plan_period == 'monthly' else self.customizableYearly
        }

        add_on_list = self.get_add_on()
        # total_price = sum(prices.get(add_on, 0) for add_on in add_on_list)
        # return [prices.get( (add_on_list[i].strip("[]").strip("'") for i in add_on_list) ) for add_on in add_on_list]
        # return( add_on_list[1].strip("[]").strip("'").strip("'") )
        # return( add_on_list[0].replace("'", "").strip("[]") )
        cleaned_list = [add_on.strip().replace("'", "").strip('[]') for add_on in add_on_list]
        """ cleaned_list = []
        for i in add_on_list:
            cleaned_item = (i.replace("'", "").strip("[]").strip())
            cleaned_list.append(cleaned_item) """
        # return cleaned_list[1]

        # return [prices.get( add_on, 0) for add_on in cleaned_list]
        # total_addOn_price = sum(prices.get(add_on, 0) for add_on in cleaned_list)
        # return total_addOn_price
        total_add_on_price = sum(prices.get(add_on, Decimal('0.0')) for add_on in cleaned_list)
        #  return sum(prices.get(add_on, 0) for add_on in cleaned_list)
        return total_add_on_price


    
    def get_add_on(self):
        # Returns a list of add-ons split by commas.If `add_on` is None or an empty string, returns an empty list.
         
        return self.add_on.split(',') if self.add_on else []

    def set_add_on(self, choices):
        # Sets the add-ons as a comma-separated string. `choices` should be a list of strings.
        
        self.add_on = ','.join(choices)

    def get_totalCost(self):
        return (self.get_plan_price() or Decimal('0.0')) + (self.get_add_on_prices() or Decimal('0.0'))

    def __str__(self):
        return f"{self.userName} - {self.plan_option} ({self.plan_period}) - {self.add_on}"
    

