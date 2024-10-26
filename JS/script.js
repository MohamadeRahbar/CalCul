// access to each section 
const display = document.getElementById('display');
const history = document.getElementById('history');
const operatorSpan = document.getElementById('operator');

// holders


function clearBtn (complete = false) {

    //reset operator and display
    operatorSpan.innerText = '';
    display.value = '0'

    if (complete){

        history.innerText = ''

    } else {
        // add clear in history
        let clearMessage = document.createElement('p')
        clearMessage.innerText = 'Cleared!'
        
        // create hr
        let clearAction = document.createElement('hr')

        //append them
        history.append(clearMessage)
        history.append(clearAction)
         
    }
}

// operators function
function operation (operator) {
    switch (operator) {
        case '+':
            operatorSpan.innerText = '+';
            // numSum();
        break;
            
        case '-':
            operatorSpan.innerText = '-';
            // numCount();
        break;
            
        case '*':
            operatorSpan.innerText = 'x';
            // numMultiple();
        break;
            
        case '/':
            operatorSpan.innerText = '÷';
            // numDevide();
            break;
            
        default:
            operatorSpan.innerText = '';
            
    }
}

// let me try ES6 function decleration type ;)
let calCule = () => {
 alert('\n' + "                             \t Designed By MohamadeRahbar " + '\n\n' + "                                   \t It Will Complete Soon :)")
}

