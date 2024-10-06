from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import StepOneForm, StepTwoForm, StepThreeForm
from .models import Subscr
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.
def index(request):
    return redirect(step_one)

def step_one(request):
    
    step_one_data = request.session.get('step-one-data', {})
    # return HttpResponse("Hello World")
    if request.method == "POST":
        form = StepOneForm(request.POST) #check whether it is valid
        if form.is_valid():
            cleaned_data = form.cleaned_data
            cleaned_data['userMobileNo'] = str(cleaned_data['userMobileNo']) # to escape "PhoneNumber is not JSON serializable"
            request.session['step-one-data'] = cleaned_data #save data in the appropriate type 
            return redirect(step_two)
            # return HttpResponse("Hi")
        else:
            return render(request, 'subscription/index.html', {'form':form})
    else:
        form = StepOneForm()
        return render(request, 'subscription/index.html', {'form':form, 's1': step_one_data,})
    
def step_two(request):
    subscription = Subscr.objects.get(pk=1)
    #retrieve stepTwoData
    step_two_data = request.session.get('step-two-data', {})

    # Check if the user has completed step one
    if 'step-one-data' not in request.session:
        return redirect(step_one)  # Redirect to step-one if not completed

    if request.method == "POST":
        form = StepTwoForm(request.POST) #check whether it is valid
        if form.is_valid():
            cleaned_data = form.cleaned_data
            request.session['step-two-data'] = cleaned_data
            return redirect(step_three)
            # return HttpResponse("Hi")
    else:
        form = StepTwoForm()
    
    context = {
        'form': form,
        'subscription': subscription,
        's2': step_two_data,
    }
    return render(request, 'subscription/step-two.html', context)

def step_three(request):
    subscription = Subscr.objects.get(pk=1)
    step_three_data = request.session.get('step-three-data', {})
    
    #check if the user have completed step two
    if 'step-two-data' not in request.session:
        return redirect(step_two)

    if request.method == "POST":
        form = StepThreeForm(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data
            request.session['step-three-data'] = cleaned_data
            return redirect(step_four)
            # return HttpResponse("Hi")
    else:
        form = StepThreeForm()
    
    context = {
        'form': form,
        'subscription': subscription,
        's3': step_three_data,
    }
    return render(request, 'subscription/step-three.html', context)


def step_four(request):
    subscription = Subscr.objects.get(pk=1)
    
    # Retrieve data from previous steps stored in session
    step_one_data = request.session.get('step-one-data', {})
    step_two_data = request.session.get('step-two-data', {})
    step_three_data = request.session.get('step-three-data', {})

    #check if the user have completed other important steps
    if 'step-two-data' not in request.session:
        return redirect(step_two)

    # change yearly to Yearly and monthly to Monthly when passed to HTML template
    plan_period_label = ""
    if step_two_data.get('plan_period') == 'yearly':
        plan_period_label = 'Yearly'
    elif step_two_data.get('plan_period') == 'monthly':
        plan_period_label = 'Monthly'
    
    plan_option_label = ""
    
    if step_two_data.get('plan_option') == 'arcade':
        plan_option_label = 'Arcade'
    elif step_two_data.get('plan_option') == 'advanced':
        plan_option_label = 'Advanced'
    elif step_two_data.get('plan_option') == 'pro':
        plan_option_label = 'Pro'
    

    # Pass the session data to the template for review
    context = {
        'subscription': subscription,
        'step_one_data': step_one_data,
        'step_two_data': step_two_data,
        'step_three_data': step_three_data,
        'plan_period_label': plan_period_label,
        'plan_option_label': plan_option_label,
        # 'add_on_label': add_on_label,
    }
    return render(request, 'subscription/step-four.html', context)

def success(request):
    step_one_data = request.session.get('step-one-data', {})
    step_two_data = request.session.get('step-two-data', {})
    step_three_data = request.session.get('step-three-data', {})
    # print("Step One Data:", step_one_data['userName'])

    # check if the user have completed othe important steps
    if 'step-two-data' not in request.session:
        return redirect(step_two)
    # submit to database
    subscription = Subscr(
        userName = step_one_data['userName'],
        userEmail = step_one_data['userEmail'],
        userMobileNo = step_one_data['userMobileNo'],

        plan_period = step_two_data['plan_period'],
        plan_option = step_two_data['plan_option'],
        
        
    )
    if step_three_data['add_on']:
        subscription.add_on = step_three_data['add_on']

    subscription.save()
    request.session.flush()

    #confirmation email
    subject = 'Subscription Confirmation'
    message = f"""
    Thank you for your subscription, {step_one_data['userName']}!

    Here are your details:
    - Email: {step_one_data['userEmail']}
    - Mobile: {step_one_data['userMobileNo']}
    - Plan: {step_two_data['plan_option'].capitalize()} ({step_two_data['plan_period'].capitalize()})
    
    Add-ons: {', '.join(step_three_data.get('add_on', [])) if step_three_data.get('add_on') else 'None'}

    We appreciate your support!
    """

    reciever_email = step_one_data['userEmail']
    sender_email = settings.DEFAULT_FROM_EMAIL

    #SEND THE MAIL
    send_mail(
        subject,
        message,
        sender_email,
        [reciever_email],
        fail_silently = False
    )

    context = {
        'step_one_data': step_one_data,
        'step_two_data': step_two_data,
        'step_three_data': step_three_data,
    }

    return render(request, 'subscription/success.html', context)
        

    # Step One Data: {'userName': 'Gbenga Opeyemi', 'userEmail': 'opesam42@gmail.com', 'userMobileNo': '+2349057339147'}
