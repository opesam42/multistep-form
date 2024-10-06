step1 = document.getElementById('step-1');
step2 = document.getElementById('step-2');
step3 = document.getElementById('step-3');
step4 = document.getElementById('step-4');
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
})




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
    if(step4){
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
    console.log(nextBtn.innerHTML)
}



/* function navigate(){
    if(step4){
        window.location.href = '/step-three/'
    }
    if(step3){
        window.location.href = '/step-two/'
    }
    if(step2){
        window.location.href = '/step-one/'
    }
} 
prevBtn.addEventListener('click', navigate) */
