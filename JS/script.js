/* 
2024/11 || calCule v1.00
Hey, 
can U improve this calculator by any libraries or frameworks?
it will be my pleasure! :)
feel free!!
U can copy, edit , delete or.. code
its my first mini-project for https://codebox.ir/
Thanks All.
Mr.Alpha || https://github.com/MohamadeRahbar
*/

const $ = document;

// holders
const UI = {
    io: $.getElementById('io'),
    history: $.getElementById('history'),
    operator: $.getElementById('operator'),
    numBtns: $.querySelectorAll('#num-pad button'),
    calPad: $.querySelectorAll("#cal-pad button")
};

// store processes logically
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
    // change * and / to x and ÷ for better UI 
    if (act === "*" || act === "x") {
        act = "x"
    } else if (act === "/") {
        act = "÷"
    }

    // update action whenever is first num exist
    if (UI.io.value === '' && PS.result !== 0) {
        PS.action = act;
        UI.operator.innerText = act;
        return;
    }

    // control io is empty or not
    if (UI.io.value === '') {
        console.log('Number Expected !');
        redAlert(UI.io)
        // return to prevent operator display
        return;
    }

    // add operator in place
    UI.operator.innerText = act;

    // if action is availble, so we have calcule it!
    if (PS.action !== '') {
        calCule()
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
    if (PS.action === '') return;
    // is second num exist for get it as static num
    if (UI.io.value !== '') {
        PS.number = parseFloat(UI.io.value);
    }

    // call related function based on operator and save it as final res
    let finalRes = operators[PS.action]();
    finalRes = parseFloat(finalRes.toFixed(4));
    // create history 
    historyCreator(finalRes);

    // show result in UI.io
    UI.io.value = finalRes;

    // update result for next calculations
    PS.result = finalRes;

    // check is any action exist or not
    if (act) {
        PS.action = act;
    } else {
        PS.action = '';
    }
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

//fx for append num to io and limit input digits 
function appendNumber(num) {
    if (UI.io.value.length > 18) {
        redAlert(UI.io);
    } else {
        UI.io.value += num;
    }
}

// keyboard event
UI.io.addEventListener("keydown", function (e) {
    // limit input numbers to 18 digits 
    if (UI.io.value.length > 18 && !["Backspace", "Delete", "F5"].includes(e.key)) {
        redAlert(UI.io);
        e.preventDefault();
    }
    // var to store selected button
    let btnSelect = null

    // control input value (operator / num)
    if (["+", "-", "x", "*", "/"].includes(e.key)) {
        setAction(e.key);
        // prevent to add operators to UI.io
        e.preventDefault();

    } else if (e.key === "Delete") {
        /* Array.from() >> is a method to creat an array from any array-like & objects
        here, UI.calpad is an HTMl NodeList object of buttons and i want to use find method, so i have to make an array from origin :)
        */
        btnSelect = Array.from(UI.calPad).find(function (btn) {
            return btn.innerText === 'CC';
        });
        clearBtn(true);
    } else if (e.key === "Backspace" && e.shiftKey) {
        btnSelect = Array.from(UI.calPad).find(function (btn) {
            return btn.innerText === 'C';
        });
        clearBtn(false);
    } else if (e.key === "Enter") {
        btnSelect = Array.from(UI.calPad).find(function (btn) {
            return btn.innerText === '=';
        });
        calCule();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
    }

    // find selected button from calPad 
    UI.calPad.forEach(function (btn) {
        if ((e.key === "*" || e.key === "x") && btn.innerText === 'x') {
            btnSelect = btn;
        } else if (e.key === "/" && btn.innerText === '÷') {
            btnSelect = btn;
        } else if (btn.innerText === e.key) {
            btnSelect = btn;
        }
    });
    // append class to button for select in UI
    if (btnSelect) {
        btnSelect.classList.add('key-active');
        setTimeout(() => btnSelect.classList.remove('key-active'), 100);
    }

})

