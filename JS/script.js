// additional comments will be deleted at last

const $ = document;

// holders
const UI = {
    io : $.getElementById('io') ,
    history : $.getElementById('history') ,
    operator : $.getElementById('operator') ,
    numBtns : $.querySelectorAll('#num-pad button')
};


// store processes
const PS = {
    action: '' ,
    number: 0 ,
    result: 0 
};

// clearing buttons fx
function clearBtn (complete = false) {

    //reset operator and display
    UI.operator.innerText = '';
    UI.io.value = ''
    PS.action = ''
    PS.number = 0;
    PS.result = 0;

    if (complete){

        UI.history.innerHTML = ''

    } else {
        
        
        // add cleared message in history
        let clearMessage = document.createElement('p')
        clearMessage.innerText = 'Cleared!'
        
        // create hr and append them
        let clearAction = document.createElement('hr')
        UI.history.append(clearMessage , clearAction)
    
    }
}


// operators function
function setAction (act) {
    // control io is empty or not
    if (UI.io.value.length < 1){
        console.log('Number Expected !');
        redAlert(UI.io)
        // return to prevent operator display
        return;
    }

    // add operator in place
    UI.operator.innerText = act;

    // if action is availble, so we have calcule it first!
    if (PS.action !== ''){
        calCule(act)
    } else {
        PS.number = parseFloat(UI.io.value)
        PS.action = act
    };
    UI.io.value = ''
    
};



// calculate and result
let calCule = () => {
    if (PS.action === '' ){return};
    let finalRes = 0;

    // get second number
    PS.result = parseFloat(UI.io.value)

    // call related function based on operator
    finalRes = operators[PS.action]();

    // create history 
    historyCreator(finalRes);

    // pipe result value as input for next calculation if exist
    UI.io.value = finalRes;
    PS.number = finalRes;

    // ?? how to implement piped num for next wihtout reset it
};


// history section
function historyCreator (finalRes) {
    let historyHtml = `${PS.number} ${PS.action} ${PS.result} = ${parseFloat(finalRes)} <hr>`;
    UI.history.innerHTML += historyHtml
}



// declaring operators functionalities in object
let operators = {
    '/': function (){ return parseFloat(PS.number) / parseFloat(PS.result)},
    'x': function (){ return parseFloat(PS.number) * parseFloat(PS.result)},
    '-': function (){ return parseFloat(PS.number) - parseFloat(PS.result)},
    '+': function (){ return parseFloat(PS.number) + parseFloat(PS.result)}
};


// empty input alert 
function redAlert(input) {
    input.classList.add('red-alert')
    setTimeout(function(){
       input.classList.remove('red-alert')
    },1200)
};


// buttons event
UI.numBtns.forEach(function(btn){
    btn.addEventListener('click' , function () {
        appendNumber(btn.innerText)
    })
})


 //fx for append num to io
function appendNumber (num){
    UI.io.value += num
}
