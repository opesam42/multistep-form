# Generated by Django 5.1.1 on 2024-09-08 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0003_subscr_advancedmonthly_subscr_advancedyearly_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscr',
            name='customizableMonthly',
            field=models.DecimalField(decimal_places=2, default=2.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='subscr',
            name='customizableYearly',
            field=models.DecimalField(decimal_places=2, default=20.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='subscr',
            name='largerStorageMonthly',
            field=models.DecimalField(decimal_places=2, default=1.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='subscr',
            name='largerStorageYearly',
            field=models.DecimalField(decimal_places=2, default=10.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='subscr',
            name='onlineServicesMonthly',
            field=models.DecimalField(decimal_places=2, default=1.0, max_digits=5),
        ),
        migrations.AddField(
            model_name='subscr',
            name='onlineServicesYearly',
            field=models.DecimalField(decimal_places=2, default=10.0, max_digits=5),
        ),
    ]
