// additional comments will be deleted at last

const $ = document;

// holders
const UI = {
    io: $.getElementById('io'),
    history: $.getElementById('history'),
    operator: $.getElementById('operator'),
    numBtns: $.querySelectorAll('#num-pad button'),
    calPad: $.querySelector("#cal-pad button")
};


// store processes
const PS = {
    action: '',
    number: 0,
    result: 0
};


// clearing buttons fx
function clearBtn(complete = false) {

    //reset operator and display
    UI.operator.innerText = '';
    UI.io.value = ''
    PS.action = ''
    PS.number = 0;
    PS.result = 0;

    if (complete) {

        UI.history.innerHTML = ''

    } else {

        // add cleared message in history
        let clearMessage = document.createElement('p')
        clearMessage.innerText = 'Cleared!'

        // create hr and append them
        let clearAction = document.createElement('hr')
        UI.history.append(clearMessage, clearAction)

    }
}


// operators function
function setAction(act) {
    // control io is empty or not
    if (UI.io.value === '') {
        console.log('Number Expected !');
        redAlert(UI.io)
        // return to prevent operator display
        return;
    }

    // change * and / to x and ÷ for better UI 
    if (act === "*") {
        act = "x"
    } else if (act === "/") {
        act = "÷"
    }

    // add operator in place
    UI.operator.innerText = act;

    // if action is availble, so we have calcule it!
    if (PS.action !== '') {
        calCule(act)
        PS.action = act

    } else { // if it's start point, we have to get numbers from input and get action
        PS.result = parseFloat(UI.io.value)
        PS.action = act

    };
    // when an action button click, input should be clear to get next number 
    UI.io.value = ''

};


// calculate and result
let calCule = (act) => {
    if (PS.action === '') { return };
    if (UI.io.value === '') {
        console.log('Enter Second Number!');
        redAlert(UI.io)
        return
    }
    let finalRes = 0;

    // get second number
    PS.number = parseFloat(UI.io.value)

    // call related function based on operator
    finalRes = operators[PS.action]();

    // create history 
    historyCreator(finalRes);

    // control is action exist
    act = PS.action
    console.log(act);
    // pipe result value as input for next calculation if exist
    UI.io.value = finalRes;
    PS.result = finalRes;

    /* problem (bug): at first time or serial calcule its ok! but if double calcule (dobule enter) after a calcul, it will power result to it own continuously! i want: when press = or enter, calcule(last act) first second number to results continuously !
    like this :
    num1 = 2 
    num2 = 3
    calCule(*) >> 2*5 = 10 >=> 5*10 = 50 >=> 5*50 = 250 >=> ...

    but now its : 2*5 = 10 >=> 10*10=100 >=> 100*100 = 10000 >=> ...
     */
};


// history section
function historyCreator(finalRes) {
    let historyHtml = `${PS.result} ${PS.action} ${PS.number} = ${finalRes} <hr>`;
    UI.history.innerHTML += historyHtml
}


// declaring operators functionalities in object
let operators = {
    '÷': function () { return parseFloat(PS.result) / parseFloat(PS.number) },
    'x': function () { return parseFloat(PS.result) * parseFloat(PS.number) },
    '-': function () { return parseFloat(PS.result) - parseFloat(PS.number) },
    '+': function () { return parseFloat(PS.result) + parseFloat(PS.number) }
};


// empty input alert 
function redAlert(input) {
    input.classList.add('red-alert')
    setTimeout(function () {
        input.classList.remove('red-alert')
    }, 1200)
};


// buttons event
UI.numBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        appendNumber(btn.innerText)
    })
})

//fx for append num to io
function appendNumber(num) {
    UI.io.value += num
}

// keyboard event
UI.io.addEventListener("keydown", function (e) {
    console.log(e);
    // control input value 
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        setAction(e.key)
    } else if (e.key === "Delete") {
        clearBtn(complete = true)
    } else if (e.key === "Backspace" && e.shiftKey) {
        clearBtn(complete = false)
    } else if (e.key === "Enter") {
        calCule();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        // how to prevent increase or decrease value!

    }

    // how to set when keyboard pressed, UI show click on e.key??
})

