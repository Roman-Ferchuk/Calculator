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
            this.currentSystem = newMode;
        }

        this.display.textContent = this.state.currentInput === '' ? '0' : this.state.currentInput;
        
        this.historyDisplay.textContent = this.state.expression.join(' ');
    }

    calculate() {

    }
}