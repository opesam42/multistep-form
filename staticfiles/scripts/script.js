step1 = document.getElementById('step-1');
step2 = document.getElementById('step-2');
step3 = document.getElementById('step-3');
step4 = document.getElementById('step-4');
successPage = document.getElementById('success-page')
nextBtn = document.querySelector('.next-btn');
prevBtn = document.querySelector('.prev-btn');



planPeriod = Array.from(document.getElementsByName('plan_period'));
planOption = Array.from(document.getElementsByName('plan_option'));

planAmount = Array.from( document.getElementsByClassName('amount') );
planExtra = Array.from( document.getElementsByClassName('extra') );
addOn = Array.from( document.querySelectorAll('.cost') );

var period1 = {
    yearly: {
        arcade: {amount: `$${arcade_yearly}/yr`},
        advanced: {amount: `$${advanced_yearly}/yr`},
        pro: {amount: `$${pro_yearly}/yr`},
    },
    monthly: {
        // arcade: {amount: "$9/mo" },
        arcade: {amount: `$${arcade_monthly}/mo` },
        advanced: {amount: `$${advanced_monthly}/mo`},
        pro: {amount: `$${pro_monthly}/mo`},
    },
}
var addOnCost = {
    yearly:{
        onlineService: `+$${online_services_yearly}/yr`, 
        largerStorage: `+$${larger_storage_yearly}/yr`, 
        customizable: `+$${customizable_yearly}/yr`,
    },

    monthly:{
        onlineService: `+$${online_services_monthly}/mo`,
        largerStorage: `+$${larger_storage_monthly}/mo`,
        customizable: `+$${customizable_monthly}/mo`
    },
}


function togglePrice(){
    let selectedPeriod;

    planPeriod.forEach((period) => {
        if(period.checked){
            selectedPeriod = period.value;
            // window.alert("Hi")
            // window.alert(addOn);
            
            if(step2){
                // save selectedPeriod to be used by other pages
                sessionStorage.setItem('selectedPeriod', selectedPeriod);
                planAmount[0].innerHTML = period1[selectedPeriod].arcade.amount;
                planAmount[1].innerHTML = period1[selectedPeriod].advanced.amount;
                planAmount[2].innerHTML = period1[selectedPeriod].pro.amount;
            }      
            
            // hide "extra 2 month when montly is chosen/selected"
            planExtra.forEach((extra => {
                if(selectedPeriod == "monthly"){
                    extra.classList.add('hide')
                } else{
                    extra.classList.remove('hide')
                }
            }))   
        }
    })
}


{
    // retrieve selectedPeriod from the session stored variable from togglePrice
    function retrieveSelectedPeriod(){
        const selectedPeriod = sessionStorage.getItem('selectedPeriod');
        return selectedPeriod
    }
    //Update add_on fee based on period
    if(step3){
        selectedPeriod = retrieveSelectedPeriod()
        addOn[0].innerHTML = addOnCost[selectedPeriod].onlineService;
        addOn[1].innerHTML = addOnCost[selectedPeriod].largerStorage;
        addOn[2].innerHTML = addOnCost[selectedPeriod].customizable;
    }
}

planPeriod.forEach((period)=> {
    period.addEventListener('change', togglePrice);
});
document.addEventListener("DOMContentLoaded", togglePrice)





// function for controlling the hoghlighting effect when navigating the form step by step
function showStep(){
    labelNo1 = document.querySelector('.pg1 .labelno');
    labelNo2 = document.querySelector('.pg2 .labelno');
    labelNo3 = document.querySelector('.pg3 .labelno');
    labelNo4 = document.querySelector('.pg4 .labelno');
    if(step1){
        labelNo1.classList.add('highlight');
    }
    if(step2){
        labelNo2.classList.add('highlight');
    }
    if(step3){
        labelNo3.classList.add('highlight');
    }
    if(step4||successPage){
        labelNo4.classList.add('highlight');
    }
}

document.addEventListener("DOMContentLoaded", showStep)

function displaySummary(){
    onlineService = document.querySelector('.onlineService')
    largerStorage = document.querySelector('.largerStorage')
    customizable = document.querySelector('.customizable')
    addOnArr = [onlineService, largerStorage, customizable]
    //retrieve period
    selectedPeriod = retrieveSelectedPeriod()

    //loop through the addOnArr to view prices on table in stepfour page
    for(i = 0; i < addOnArr.length; i++){
        if(addOnArr[i]){
            price = ( Array.from(addOnArr[i].children)[1] )
            class_name = addOnArr[i].className
            price.innerHTML = ( addOnCost[selectedPeriod][class_name] )
        }  
    }

    arcade = document.querySelector('.Arcade')
    advanced = document.querySelector('.Advanced')
    pro = document.querySelector('.Pro')
    planOptionArr = [arcade, advanced, pro];
    planCost = document.querySelector('.plan_cost')

    for(i = 0; i < planOptionArr.length; i++){
        if(planOptionArr[i]){
            //convert classname to lowercase
            class_name = (planOptionArr[i].className).toLowerCase()
            price = period1[selectedPeriod][class_name].amount
            planCost.innerHTML = price
        }
    }

    pricesColumn = (Array.from(document.querySelectorAll('.cost-view')) )
    pricesColumn.push(planCost)
    console.log(planCost)
    console.log(pricesColumn)

    totalSum = 0
    for(i=0; i<pricesColumn.length; i++){
        let match = pricesColumn[i].innerHTML.match(/(\d+)/)
        if(match){
            //convert the matched string to a number
            value = parseInt(match[0])
        }
        totalSum += value
    }
    if(selectedPeriod == 'monthly'){
        totalSumFormat = `$${totalSum}/mo`
        document.querySelector('.per_period').innerHTML = "(per month)"
    }
    if(selectedPeriod == 'yearly'){
        totalSumFormat = `$${totalSum}/yr`
        document.querySelector('.per_period').innerHTML = "(per year)"
    }
    
    document.querySelector('.total-cost-view').innerHTML = totalSumFormat
}
if(step4){
    document.addEventListener("DOMContentLoaded", displaySummary)
    nextBtn.innerHTML = 'Confirm';
    console.log(nextBtn);

}
if(successPage){
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
}

// redirection using the next and previous button
function redirect(target, link){
    window.location.href = link
}

    if(step2){
        prevBtn.addEventListener('click', function(){
            redirect(prevBtn, '../step-one')
        });
    }
    if(step3){
        prevBtn.addEventListener('click', function(){
            redirect(prevBtn, '../step-two')
        });
    }
    if(step4){
        prevBtn.addEventListener('click', function(){
            redirect(prevBtn, '../step-three')
        });
        
        nextBtn.addEventListener('click', function(event){
            event.preventDefault();
            redirect(nextBtn, '../success')
        });
    }




var userName = document.getElementById('id_userName');
var nameLabel = document.querySelector('label[for="id_userName"]');

var userEmail = document.getElementById('id_userEmail');
var emailLabel = document.querySelector('label[for="id_userEmail"]');

var mobileNo = document.getElementById('id_userMobileNo');
var mobleNoLabel = document.querySelector('label[for="id_userMobileNo"]')

var planOptionField = Array.from( document.getElementsByName('plan_option') )
var planOptionLabel = document.querySelector('.inputs-wrapper')

function createErrorMessage(message){
    errorMsg = document.createElement('span');
    errorMsg.innerHTML = message
    errorMsg.classList.add('error');
    // hasErrors = true
    return errorMsg
}

function checkError(){

    hasErrors = false


    errorMessages = document.querySelectorAll('.error');
    if(errorMessages){
        errorMessages.forEach(function(errorMsg){
            errorMsg.remove();
        })
    }

    if(step1){
        // username validation
        if(userName.value.trim() == ""){
            errorMsg = createErrorMessage("This field is required")
            nameLabel.appendChild(errorMsg)
            hasErrors = true
        } 

        //user email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(userEmail.value.trim() == ""){
            errorMsg = createErrorMessage("This field is required")
            emailLabel.appendChild(errorMsg)
            hasErrors = true
        } else if (!emailPattern.test(userEmail.value)) {
            errorMsg = createErrorMessage("Please enter a valid email address");
            emailLabel.appendChild(errorMsg);
            hasErrors = true;
        }
        
        //phone number validation
        if(mobileNo.value.trim() == ""){
            errorMsg = createErrorMessage("This field is required");
            mobleNoLabel.appendChild(errorMsg);
            hasErrors = true;
        } else if(mobileNo.value.length > 0 && mobileNo.value.split('')[0] != '+'){
            mobileNo.value = `+${mobileNo.value}`;
            console.log(2)
        }else if(mobileNo.value.length < 6){
            errorMsg = createErrorMessage("Invalid mobile number format");
            mobleNoLabel.appendChild(errorMsg);
            hasErrors = true;
        } 
        else{ 
            try{
                if( !(( libphonenumber.parsePhoneNumber(mobileNo.value) ).isValid()) ){
                errorMsg = createErrorMessage("Invalid mobile number format");
                mobleNoLabel.appendChild(errorMsg);
                hasErrors = true;
                }
            } catch(err){
                errorMsg = createErrorMessage("Invalid mobile number format");
                mobleNoLabel.appendChild(errorMsg);
                hasErrors = true;
            }
        }
    }
        
    

    if(step2){
        var isChecked = planOptionField.some(function(plan){
            return plan.checked;
        })
        if(!isChecked){
            errorMsg = createErrorMessage("This field is required");
            planOptionLabel.appendChild(errorMsg)
            hasErrors = true
        }
    }
    return hasErrors;
}

nextBtn.addEventListener('click', function(event){
    hasErrors = checkError()
    
    //if no errors
    if(hasErrors){
        event.preventDefault();
    }
    // checkError();
});