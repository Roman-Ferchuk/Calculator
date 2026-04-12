class StandardCalculator {
    constructor() {
        this.state = new CalculatorState();
        this.shouldResetScreen = false;

        this.display = document.getElementById('display');
        this.historyDisplay = document.getElementById('history');

        this.memoryValue = 0;
        this.hasMemory = false;
    }

    clearDisplay() {
        this.state.currentInput = '';
        this.state.expression = [];
        this.updateDisplay();
    }

    setOperator(operator) {
        if (this.state.currentInput !== '') {
            this.state.expression.push(Number(this.state.currentInput));
            this.state.currentInput = '';
        } else if (this.state.expression.length === 0) {
            this.state.expression.push(0);
        }

        if (this.state.expression.length > 0 && typeof this.state.expression[this.state.expression.length - 1] === 'string') {
            this.state.expression[this.state.expression.length - 1] = operator;
        } else if (this.state.expression.length > 0) {
            this.state.expression.push(operator);
        }
        
        console.log('Current expression:', this.state.expression);
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.state.currentInput = '';
            this.shouldResetScreen = false;
        }

        if (this.state.currentInput === '0' && number === '0') return;
        if (this.state.currentInput === '0' && number !== '0') this.state.currentInput = '';

        this.state.currentInput += number;
        this.updateDisplay();
    }

    appendDecimal() {
        if (!this.state.currentInput.includes('.')) {
            this.state.currentInput += this.state.currentInput === '' ? '0.' : '.';
        }

        this.updateDisplay();
    }

    appendPercent() {
        if (this.state.currentInput === '') return;

        let value = parseFloat(this.state.currentInput);
        
        this.state.currentInput = (value / 100).toString();

        this.updateDisplay();
    }

    toggleSign() {
        if (!(this.state.currentInput.charAt(0) === '-')) {
            this.state.currentInput = '-' + this.state.currentInput;
        } else {
            this.state.currentInput = this.state.currentInput.substring(1);
        }

        this.updateDisplay();
    }

    backspace() {
        if (this.state.currentInput.length > 0) {
            this.state.currentInput = this.state.currentInput.slice(0, this.state.currentInput.length - 1);
            this.updateDisplay();
        }
    }

    calculate() {
        if (this.state.expression.length === 0) return;
 
        if (this.state.currentInput !== '') {
            this.state.expression.push(Number(this.state.currentInput));
            this.state.currentInput = '';
        } else if (this.state.expression.length > 0 && typeof this.state.expression[this.state.expression.length - 1] === 'string') {
            this.state.expression.pop();
        }
        
        if (this.state.expression.length < 3) return;
 
        for (let i = 0; i < this.state.expression.length; i++) {
            if (this.state.expression[i] === '^') {
                if (i > 0 && i < this.state.expression.length - 1) {
                    const result = Math.pow(this.state.expression[i - 1], this.state.expression[i + 1]);
                    this.state.expression.splice(i - 1, 3, result);
                    i--;
                }
            }
        }
 
        for (let i = 0; i < this.state.expression.length; i++) {
            if (this.state.expression[i] === '×') {
                if (i > 0 && i < this.state.expression.length - 1) {
                    const result = this.state.expression[i - 1] * this.state.expression[i + 1];
                    this.state.expression.splice(i - 1, 3, result);
                    i--;
                }
            } else if (this.state.expression[i] === '÷') {
                if (i > 0 && i < this.state.expression.length - 1) {
                    if (this.state.expression[i + 1] === 0) {
                        alert('Неможливо ділити на нуль!');
                        this.clearDisplay();
                        return;
                    }
                    const result = this.state.expression[i - 1] / this.state.expression[i + 1];
                    this.state.expression.splice(i - 1, 3, result);
                    i--;
                }
            }
        }
 
        for (let i = 0; i < this.state.expression.length; i++) {
            if (this.state.expression[i] === '+') {
                if (i > 0 && i < this.state.expression.length - 1) {
                    const result = this.state.expression[i - 1] + this.state.expression[i + 1];
                    this.state.expression.splice(i - 1, 3, result);
                    i--;
                }
            } else if (this.state.expression[i] === '−' || this.state.expression[i] === '-') {
                if (i > 0 && i < this.state.expression.length - 1) {
                    const result = this.state.expression[i - 1] - this.state.expression[i + 1];
                    this.state.expression.splice(i - 1, 3, result);
                    i--;
                }
            }
        }
 
        if (this.state.expression.length > 0) {
            let finalResult = this.state.expression[0];
            finalResult = parseFloat(finalResult.toPrecision(12));
            this.state.currentInput = finalResult.toString();
        }
 
        this.state.expression = [];
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    updateMemoryIndicator() {
        const btn = document.getElementById('standard-module').querySelector('#memory-recall');

        if (btn) {
            btn.style.outline = this.hasMemory ? '2px solid var(--btn-border)' : 'none';
            btn.title = this.hasMemory ? `Memory: ${this.memoryValue}` : '';
        }
    }

    memoryAdd() {
        const current = parseFloat(this.display.textContent);
        if (isNaN(current)) return;
        this.memoryValue += current;

        this.memoryValue = parseFloat(this.memoryValue.toPrecision(12));

        this.hasMemory = true;
        this.shouldResetScreen = true;
        this.updateMemoryIndicator();
    }

    memorySubtract() {
        const current = parseFloat(this.display.textContent);
        if (isNaN(current)) return;
        this.memoryValue -= current;

        this.memoryValue = parseFloat(this.memoryValue.toPrecision(12));

        this.hasMemory = true;
        this.shouldResetScreen = true;
        this.updateMemoryIndicator();
    }

    memoryRecall() {
        if (!this.hasMemory) return;
        this.state.currentInput = this.memoryValue.toString();
        this.state.shouldResetScreen = true;
        this.updateDisplay();
    }

    memoryClear() {
        this.memoryValue = 0;
        this.hasMemory = false;
        this.updateMemoryIndicator();
    }

    factorial() {
        if (this.state.currentInput === '') return;

        let value = parseInt(this.state.currentInput);

        if (value < 0) {
            alert('Factorial is not defined for negative numbers.');
            return;
        }

        let result = 1;
        for (let i = 1; i <= value; i++) {
            result *= i;
        }

        this.state.currentInput = result.toString();
        this.updateDisplay();
    }

    square() {
        if (this.state.currentInput === '') return;

        let value = parseFloat(this.state.currentInput);
        this.state.currentInput = (value * value).toString();
        this.updateDisplay();
    }

    squareRoot() {
        if (this.state.currentInput === '') return;

        let value = parseFloat(this.state.currentInput);
        if (value < 0) {
            alert('Square root is not defined for negative numbers.');
            return;
        }

        this.state.currentInput = Math.sqrt(value).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.state.currentInput === '' ? '0' : this.state.currentInput;

        this.historyDisplay.textContent = this.state.expression.map(item => {
            if (typeof item === 'number' && item < 0) {
                return `(${item})`;
            }
            return item;
        }).join(' ');
    }
}