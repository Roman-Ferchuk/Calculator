let expression = [];
let currentInput = '';
const display = document.getElementById('display');
historyDisplay = document.getElementById('history');

function clearDisplay() {
    currentInput = '';
    expression = [];
    updateDisplay();
}

function toggleSign() {
    if (!(currentInput.charAt(0) === '-')) {
        currentInput = '-' + currentInput;
    } else {
        currentInput = currentInput.substring(1);
    }

    updateDisplay();
}

function appendPercent() {
    if (currentInput === '') return;

    let value = parseFloat(currentInput);
    
    currentInput = (value / 100).toString();

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
}

function appendNumber(number) {
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

function calculate() {
    
}

function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;

    historyDisplay.textContent = expression.map(item => {
        if (typeof item === 'number' && item < 0) {
            return `(${item})`;
        }
        return item;
    }).join(' ');
    
    console.log('Current expression:', expression);
}