// number on the caluclator screen, it is intentionally a string
let buffer = '0';
// store the accumulated result of mathmatical operations                                 
let runningTotal = 0;
// keeping track of the last used math symbol                              
let previousOperator = null;
// storing the calculator screen number                       
const screen = document.querySelector('.screen');   


function buttonClick(value) {
    // parsing the string to int and check if that is not a number
    if (isNaN(parseInt(value))) {  
        // It's not a number, It's a symbol so It's passed to the symbol function 
        handleSymbol(value);        
    } else {
        // It's a number, passing it to number function
        handleNumber(value);        
    }
    // if someone clicks a button, it should rerender, sets the number on the screen
    rerender();                     
}

function handleNumber(number) {
    if (buffer === '0') {  
        // if the 0 is pressed, then 0 is replaced with 0 
        buffer = number;    
    } else {
        /* if buffer is 8 and number 2 is pressed, because buffer is a string, 
        it should be 82 because adding an int to a string automatically converts it to string */
        buffer += number;   

    }
}

function handlemath(value) {
    // if a symbol is clicked while the screen number is 0, nothing happens
    if (buffer === 0) {                     
        return;
    }

    const intBuffer = parseInt(buffer);     
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    // storing the last math symbol
    previousOperator = value;
    // if its 56 and we press + the screen should go to 0 because of a new input number             
    buffer = '0';                           
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === 'x') {
        runningTotal *= intBuffer
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            // number goes back to 0 on the screen
            buffer = '0';                       
            break;
        case '=':
            // checking if there was any math operation done yet
            if (previousOperator === null) {    
                return
            }
            // if 5+5 is pressed, the screeb should show 10 (runningTotal)
            flushOperation(parseInt(buffer));
            // if equals is pressed there is no last math operator   
            previousOperator = null;
            // converting to srting, and setting the value of buffer to be of runningtotal, rerender() will set it to be on the screen            
            buffer = "" + runningTotal;         
            runningTotal = 0;
            break;
        case '←':
            // if there is just 1 number on the screen, and we hit back it sets it to 0
            if (buffer.length === 1) {          
                buffer = '0';
            } else {
                // we take the string and we cut off the last number
                buffer = buffer.substring(0, buffer.length - 1)  
            }
            break;
        case '+':
        case '-':
        case '÷':
        case 'x':
            handlemath(symbol);
            break;

    }
        
}

function init() {
    // selecting all the buttons !!!EVENT BUBBLING!!!
    document.querySelector('.calc-buttons') 
        // listen everytime someone clicks on it            
        .addEventListener("click", function(event) {   
            // calling the buttonClick function, its going to be the C / numbers / divide ect 
            buttonClick(event.target.innerText);        
        });
}

function rerender() {   
    // everytime rerender is calling it will make screen and buffer the same thing        
    screen.innerText = buffer;  
}

init();