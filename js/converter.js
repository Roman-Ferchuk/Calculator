class Converter {
    constructor() {
        this.currentInput = '';
        this.inputDisplay = document.getElementById('convert-input-display');
        this.resultDisplay = document.getElementById('convert-result-display');    
        this.categorySelect = document.getElementById('convert-category');
        this.unitFromSelect = document.getElementById('unit-from');
        this.unitToSelect = document.getElementById('unit-to');  

        this.unitsData = {
            length: {
                cm: 0.01,
                m: 1,
                km: 1000
            },
            weight: {
                g: 0.001,
                kg: 1,
                ton: 1000
            },
            area: {
                'cm²': 0.0001,
                'm²': 1,
                'km²': 1000000
            }
        };

        this.init();
    }
    
    init() {
        this.categorySelect.addEventListener('change', () => this.updateUnitOptions());

        this.unitFromSelect.addEventListener('change', () => this.calculate());
        this.unitToSelect.addEventListener('change', () => this.calculate());

        this.updateUnitOptions();
    }

    updateUnitOptions() {
        const selectedCategory = this.categorySelect.value;
        const units = Object.keys(this.unitsData[selectedCategory]);
 
        this.unitFromSelect.innerHTML = '';
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            this.unitFromSelect.appendChild(option);
        });
 
        this.unitToSelect.innerHTML = '';
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            this.unitToSelect.appendChild(option);
        });
 
        if (units.length > 1) {
            this.unitToSelect.value = units[1];
        }
 
        this.calculate();
    }

    clearDisplay() {
        this.currentInput = '';
        this.updateInputDisplay();
        this.calculate();
    }

    backspace() {
        if (this.currentInput.length > 0) {
            this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1);
            this.updateInputDisplay();
            this.calculate();
        }
    }

    appendNumber(number) {
        if (this.currentInput === '0' && number === '0') return;
        if (this.currentInput === '0' && number !== '0') this.currentInput = '';

        this.currentInput += number;
        this.updateInputDisplay();
        this.calculate();
    }

    appendDecimal() {
        if (!this.currentInput.includes('.')) {
            this.currentInput += this.currentInput === '' ? '0.' : '.';
        }

        this.updateInputDisplay();
        this.calculate();
    }

    calculate() {
        if (this.currentInput === '' || this.currentInput === '0.') {
            this.updateResultDisplay(0);
            return;
        }
 
        const inputValue = parseFloat(this.currentInput);
        if (isNaN(inputValue)) {
            this.updateResultDisplay(0);
            return;
        }
 
        const selectedCategory = this.categorySelect.value;
        const unitFrom = this.unitFromSelect.value;
        const unitTo = this.unitToSelect.value;
 
        const coefficientFrom = this.unitsData[selectedCategory][unitFrom];
        const coefficientTo = this.unitsData[selectedCategory][unitTo];
 
        const resultInBase = inputValue * coefficientFrom;
        const result = resultInBase / coefficientTo;
 
        this.updateResultDisplay(result);
    }

    updateInputDisplay() {
        this.inputDisplay.textContent = this.currentInput === '' ? '0' : this.currentInput;
    }

    updateResultDisplay(result) {
        let formattedResult;
        if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = parseFloat(result.toPrecision(10)).toString();
        }

        this.resultDisplay.textContent = formattedResult;
    }

    reset() {
        this.currentInput = '';
        this.updateInputDisplay();
        this.calculate();
    }
}