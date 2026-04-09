let expression = [];
let currentInput = '';
let shouldResetScreen = false;
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

function clearDisplay() {
    currentInput = '';
    expression = [];
    updateDisplay();
}

function setOperator(operator) {
    if (currentInput !== '') {
        expression.push(Number(currentInput));
        currentInput = '';
    } else if (expression.length === 0) {
        expression.push(0);
    }

    if (expression.length > 0 && typeof expression[expression.length - 1] === 'string') {
        expression[expression.length - 1] = operator;
    } else if (expression.length > 0) {
        expression.push(operator);
    }
    
    console.log('Current expression:', expression);
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }

    if (currentInput === '0' && number === '0') return;
    if (currentInput === '0' && number !== '0') currentInput = '';

    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
    }

    updateDisplay();
}

function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, currentInput.length - 1);
        updateDisplay();
    }
}

function calculate() {
    if (currentInput !== '') {
        expression.push(Number(currentInput));
        currentInput = '';
    } else {
        expression.pop();
    }

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '*') {
            expression[i - 1] = expression[i - 1] * expression[i + 1];
            expression.splice(i, 2);
            i--;
        } else if (expression[i] === '÷') {
            if (expression[i + 1] === 0) {
                alert('Cannot divide by zero!');
                return;
            }

            expression[i - 1] = expression[i - 1] / expression[i + 1];
            expression.splice(i, 2);
            i--;
        }
    }

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '+') {
            expression[i - 1] = expression[i - 1] + expression[i + 1];
            expression.splice(i, 2);
            i--;
        } else if (expression[i] === '-') {
            expression[i - 1] = expression[i - 1] - expression[i + 1];
            expression.splice(i, 2);
            i--;
        }
    }

    console.log('Final result:', expression[0]);
    currentInput = expression[0].toString();
    expression = [];
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;

    historyDisplay.textContent = expression.map(item => {
        if (typeof item === 'number' && item < 0) {
            return `(${item})`;
        }
        return item;
    }).join(' ');
}
