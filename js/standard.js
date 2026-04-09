function appendPercent() {
    if (currentInput === '') return;

    let value = parseFloat(currentInput);
    
    currentInput = (value / 100).toString();

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

function factorial() {
    if (currentInput === '') return;

    let value = parseInt(currentInput);

    if (value < 0) {
        alert('Factorial is not defined for negative numbers.');
        return;
    }

    let result = 1;
    for (let i = 1; i <= value; i++) {
        result *= i;
    }

    currentInput = result.toString();
    updateDisplay();
}

function square() {
    if (currentInput === '') return;

    let value = parseFloat(currentInput);
    currentInput = (value * value).toString();
    updateDisplay();
}

function squareRoot() {
    if (currentInput === '') return;

    let value = parseFloat(currentInput);
    if (value < 0) {
        alert('Square root is not defined for negative numbers.');
        return;
    }

    currentInput = Math.sqrt(value).toString();
    updateDisplay();
}