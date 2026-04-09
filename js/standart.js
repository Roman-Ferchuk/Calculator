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