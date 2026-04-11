class ProgrammerCalculator {
    constructor() {
        this.state = new CalculatorState();
        this.shouldResetScreen = false;
        this.display = document.getElementById('display');
        this.historyDisplay = document.getElementById('history');

        this.sysItems = document.querySelectorAll('.sys-item');
        this.hexButtons = document.querySelectorAll('.hex-btn');
        this.decButtons = document.querySelectorAll('.digit-dec');
        this.binButtons = document.querySelectorAll('.digit-bin'); 

        this.decVal = document.getElementById('dec-val');
        this.binVal = document.getElementById('bin-val');
        this.hexVal = document.getElementById('hex-val');

        this.currentSystem = 'DEC';

        this.sysItems.forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('.sys-item.active').classList.remove('active');
                item.classList.add('active');
                this.updateKeypad(item.getAttribute('data-sys'));
                this.updateDisplay(item.getAttribute('data-sys'));
            });
        });
    }

    updateKeypad(mode) {
        const dotBtn = document.getElementById('prog-decimal');
        if (mode === 'BIN') {
            this.hexButtons.forEach(b => b.disabled = true);
            this.decButtons.forEach(b => b.disabled = true);
            this.binButtons.forEach(b => b.disabled = false); 
            dotBtn.disabled = true;
        } else if (mode === 'DEC') {
            this.hexButtons.forEach(b => b.disabled = true);
            this.decButtons.forEach(b => b.disabled = false);
            this.binButtons.forEach(b => b.disabled = false); 
            dotBtn.disabled = false;
        } else if (mode === 'HEX') {
            this.hexButtons.forEach(b => b.disabled = false);
            this.decButtons.forEach(b => b.disabled = false);
            this.binButtons.forEach(b => b.disabled = false);
            dotBtn.disabled = false;
        }
    }

    clearDisplay() {
        this.state.currentInput = '';
        this.state.expression = [];
        this.updateDisplay(this.currentSystem);
    }

    backspace() {
        if (this.state.currentInput.length > 0) {
            this.state.currentInput = this.state.currentInput.slice(0, this.state.currentInput.length - 1);
            this.updateDisplay(this.currentSystem);
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.state.currentInput = '';
            this.shouldResetScreen = false;
        }

        if (this.state.currentInput === '0' && number === '0') return;
        if (this.state.currentInput === '0' && number !== '0') this.state.currentInput = '';

        this.state.currentInput += number;
        this.updateDisplay(this.currentSystem);
    }

    setOperator(operator) {
        const bases = { 'BIN': 2, 'DEC': 10, 'HEX': 16 };
        const currentBase = bases[this.currentSystem];

        if (this.state.currentInput !== '') {
            const val = parseInt(this.state.currentInput, currentBase);
            
            if (!isNaN(val)) {
                this.state.expression.push(val);
            }
            this.state.currentInput = '';
        } else if (this.state.expression.length === 0) {
            this.state.expression.push(0);
        }

        const lastItem = this.state.expression[this.state.expression.length - 1];
        if (typeof lastItem === 'string') {
            this.state.expression[this.state.expression.length - 1] = operator;
        } else {
            this.state.expression.push(operator);
        }

        console.log('Current expression:', this.state.expression);
        
        this.updateDisplay(this.currentSystem); 
    }

    updateDisplay(newMode) {
        const bases = { 'BIN': 2, 'DEC': 10, 'HEX': 16 };
        const oldBase = bases[this.currentSystem];
        const newBase = bases[newMode];

        let numericValue = 0;
        if (this.state.currentInput !== '') {
            numericValue = parseInt(this.state.currentInput, oldBase);
        }
        if (isNaN(numericValue)) numericValue = 0;

        this.decVal.innerText = numericValue.toString(10);
        this.binVal.innerText = numericValue.toString(2);
        this.hexVal.innerText = numericValue.toString(16).toUpperCase();

        if (newMode !== this.currentSystem) {
            if (this.state.currentInput !== '') {
                this.state.currentInput = numericValue.toString(newBase).toUpperCase();
            }

            this.state.expression = this.state.expression.map(item => {
                if (typeof item === 'number') {
                    return item; 
                }
                return item;
            });

            this.currentSystem = newMode;
        }

        this.display.textContent = this.state.currentInput === '' ? '0' : this.state.currentInput;
        
        this.historyDisplay.textContent = this.state.expression.map(item => {
            if (typeof item === 'number') {
                return item.toString(newBase).toUpperCase();
            }
            return item;
        }).join(' ');
    }

    calculate() {
        const bases = { 'BIN': 2, 'DEC': 10, 'HEX': 16 };
        const currentBase = bases[this.currentSystem];

        if (this.state.currentInput !== '') {
            const val = parseInt(this.state.currentInput, currentBase);
            if (!isNaN(val)) this.state.expression.push(val);
            this.state.currentInput = '';
        }

        while (this.state.expression.length > 0 && typeof this.state.expression[this.state.expression.length - 1] === 'string') {
            this.state.expression.pop();
        }

        if (this.state.expression.length < 3) return;

        let tempExpr = [...this.state.expression];
        
        for (let i = 0; i < tempExpr.length; i++) {
            if (tempExpr[i] === '×' || tempExpr[i] === '*') {
                tempExpr[i-1] = tempExpr[i-1] * tempExpr[i+1];
                tempExpr.splice(i, 2);
                i--;
            } else if (tempExpr[i] === '÷' || tempExpr[i] === '/') {
                if (tempExpr[i+1] === 0) {
                    alert("Division by zero");
                    this.clearDisplay();
                    return;
                }
                tempExpr[i-1] = Math.floor(tempExpr[i-1] / tempExpr[i+1]); 
                tempExpr.splice(i, 2);
                i--;
            }
        }

        let result = tempExpr[0];
        for (let i = 1; i < tempExpr.length; i += 2) {
            let operator = tempExpr[i];
            let nextVal = tempExpr[i+1];
            if (operator === '+') result += nextVal;
            if (operator === '-') result -= nextVal;
        }

        const error = this.state.validateResult(result);
        if (error) {
            this.state.expression = [];
            this.state.currentInput = '';
            this.display.textContent = error;
            return;
        }

        this.state.currentInput = result.toString(currentBase).toUpperCase();
        this.state.expression = []; 
        this.shouldResetScreen = true;
        this.updateDisplay(this.currentSystem);
    }

    appendDecimal() {
        if (this.currentSystem !== 'DEC') return; 
        if (this.state.currentInput.includes('.')) return;
        this.state.currentInput += this.state.currentInput === '' ? '0.' : '.';
        this.updateDisplay(this.currentSystem);
    }
}