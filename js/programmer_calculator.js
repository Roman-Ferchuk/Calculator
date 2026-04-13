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
        if (mode === 'BIN') {
            this.hexButtons.forEach(b => b.disabled = true);
            this.decButtons.forEach(b => b.disabled = true);
            this.binButtons.forEach(b => b.disabled = false); 
        } else if (mode === 'DEC') {
            this.hexButtons.forEach(b => b.disabled = true);
            this.decButtons.forEach(b => b.disabled = false);
            this.binButtons.forEach(b => b.disabled = false); 
        } else if (mode === 'HEX') {
            this.hexButtons.forEach(b => b.disabled = false);
            this.decButtons.forEach(b => b.disabled = false);
            this.binButtons.forEach(b => b.disabled = false);
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
                this.state.currentInput = ''; 
            }
        } 
        else if (this.state.expression.length === 0) {
            this.state.expression.push(0);
        }

        const lastIndex = this.state.expression.length - 1;
        if (typeof this.state.expression[lastIndex] === 'string') {
            this.state.expression[lastIndex] = operator;
        } else {
            this.state.expression.push(operator);
        }
    }

    updateDisplay(newMode) {
        const bases = { 'BIN': 2, 'DEC': 10, 'HEX': 16 };
        const oldBase = bases[this.currentSystem];
        const newBase = bases[newMode];

        let activeValue = 0;
        if (this.state.currentInput !== '') {
            activeValue = parseInt(this.state.currentInput, oldBase);
        } else {
            activeValue = [...this.state.expression].reverse().find(item => typeof item === 'number') || 0;
        }
        if (isNaN(activeValue)) activeValue = 0;

        this.decVal.innerText = activeValue.toString(10);
        this.binVal.innerText = activeValue.toString(2);
        this.hexVal.innerText = activeValue.toString(16).toUpperCase();

        if (newMode !== this.currentSystem) {
            if (this.state.currentInput !== '') {
                this.state.currentInput = activeValue.toString(newBase).toUpperCase();
            }
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

        if (this.state.expression.length < 3) {
            if (this.state.expression.length >= 1 && typeof this.state.expression[0] === 'number') {
                const currentBase = bases[this.currentSystem];
                this.state.currentInput = this.state.expression[0].toString(currentBase).toUpperCase();
                this.state.expression = [];
                this.shouldResetScreen = true;
                this.updateDisplay(this.currentSystem);
            }
            return;
        }

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
            if (operator === '−' || operator === '-') result -= nextVal;
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

    reset() {
        this.state.currentInput = '';
        this.state.expression = [];
        this.shouldResetScreen = false;
        this.updateDisplay(this.currentSystem);
        this.currentSystem = 'DEC'; 
    }

    handlePaste(text) {
        let cleanText = text.trim().toUpperCase();
        
        let validPattern;
        if (this.currentSystem === 'HEX') {
            validPattern = /^[0-9A-F+\-×÷*/\s()−]+$/;
        } else if (this.currentSystem === 'BIN') {
            validPattern = /^[0-1+\-×÷*/\s()−]+$/;
        } else {
            validPattern = /^[0-9+\-×÷*/\s()−]+$/;
        }

        if (!validPattern.test(cleanText)) {
            alert(`The text contains characters that are not allowed for the mode ${this.currentSystem}`);
            return;
        }

        const tokens = cleanText.split(/([+\-×÷*/−])|(?=[+\-×÷*/−])/).filter(t => t && t.trim() !== '');

        this.state.expression = [];
        this.state.currentInput = '';

        const radix = this.currentSystem === 'HEX' ? 16 : (this.currentSystem === 'BIN' ? 2 : 10);

        tokens.forEach(token => {
            token = token.trim();
            if (/^[0-9A-F]+$/.test(token)) {
                const num = parseInt(token, radix);
                this.state.expression.push(num);
            } else {
                let op = token.replace('*', '×').replace('/', '÷').replace('-', '−');
                this.state.expression.push(op);
            }
        });

        if (this.state.expression.length > 0 && typeof this.state.expression[this.state.expression.length - 1] === 'number') {
            const lastNum = this.state.expression.pop();
            this.state.currentInput = lastNum.toString(radix).toUpperCase();
        }

        this.updateDisplay(this.currentSystem);
    }

    copyHistory() {
        const historyText = this.historyDisplay.textContent;
        if (historyText) {
            navigator.clipboard.writeText(historyText)
                .then(() => {
                    const originalColor = this.historyDisplay.style.color;
                    this.historyDisplay.style.color = "#ff99cc"; // "Pick-me" рожевий
                    setTimeout(() => this.historyDisplay.style.color = originalColor, 500);
                })
                .catch(err => console.error('Error copying:', err));
        }
    }
}