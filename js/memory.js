let memoryValue = 0;
let hasMemory = false;
shouldResetScreen = false;

function updateMemoryIndicator() {
    const btn = document.querySelector('[onclick="memoryRecall()"]');
    if (btn) {
        btn.style.outline = hasMemory ? '2px solid var(--btn-border)' : 'none';
        btn.title = hasMemory ? `Memory: ${memoryValue}` : '';
    }
}

function memoryAdd() {
    const current = parseFloat(display.textContent);
    if (isNaN(current)) return;
    memoryValue += current;

    memoryValue = parseFloat(memoryValue.toPrecision(12));

    hasMemory = true;
    shouldResetScreen = true;
    updateMemoryIndicator();
}

function memorySubtract() {
    const current = parseFloat(display.textContent);
    if (isNaN(current)) return;
    memoryValue -= current;

    memoryValue = parseFloat(memoryValue.toPrecision(12));

    hasMemory = true;
    shouldResetScreen = true;
    updateMemoryIndicator();
}

function memoryRecall() {
    if (!hasMemory) return;
    currentInput = memoryValue.toString();
    shouldResetScreen = true;
    updateDisplay();
}

function memoryClear() {
    memoryValue = 0;
    hasMemory = false;
    updateMemoryIndicator();
}
