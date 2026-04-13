class CaffeineCalculator {
    constructor() {
        this.currentWeightInput = '';
        this.currentCaffeineInput = '';
        this.currentWeightSystem = 'kg';
        this.chosenInputDisplay = '';
        
        this.weightInputDisplay = document.getElementById('weight-input-display');
        this.caffeineInputDisplay = document.getElementById('caffeine-input-display');
        this.maxCaffeineResultDisplay = document.getElementById('max-caffeine-result-display');
        this.caffeineLeftResultDisplay = document.getElementById('caffeine-left-result-display');

        this.weightUnitSelect = document.getElementById('weight-unit');
    }

    selectWeightSystem(selected) {
        if (selected === 'kg')
            this.currentWeightSystem = 'kg'
        else if (selected === 'lb')
            this.currentWeightSystem = 'lb';

        this.calculate();
    }

    setActiveForInput(inputDisplay) {
        if (inputDisplay === '') return;

        if (inputDisplay === this.chosenInputDisplay) return;
        else {
            if (inputDisplay === 'weight') {
                this.weightInputDisplay.classList.add('chosen-input-display');
                this.caffeineInputDisplay.classList.remove('chosen-input-display');
                this.weightInputDisplay.style.outline = '2px solid var(--btn-border)';
                this.caffeineInputDisplay.style.outline = 'none';

                this.chosenInputDisplay = 'weight';
            } else if (inputDisplay === 'caffeine') {
                this.weightInputDisplay.classList.remove('chosen-input-display');
                this.caffeineInputDisplay.classList.add('chosen-input-display');
                this.weightInputDisplay.style.outline = 'none';
                this.caffeineInputDisplay.style.outline = '2px solid var(--btn-border)';

                this.chosenInputDisplay = 'caffeine';
            }
        }
    }

    clearDisplay() {
        this.currentWeightInput = '';
        this.currentCaffeineInput = '';
        this.updateCaffeineInputDisplay();
        this.updateWeightInputDisplay();
        this.calculate();
    }

    backspace() {
        if (this.chosenInputDisplay === 'weight') {
            if (this.currentWeightInput.length > 0) {
                this.currentWeightInput = this.currentWeightInput.slice(0, this.currentWeightInput.length - 1);
                this.updateWeightInputDisplay();
                this.calculate();
            }
        } else if (this.chosenInputDisplay === 'caffeine') {
            if (this.currentCaffeineInput.length > 0) {
                this.currentCaffeineInput = this.currentCaffeineInput.slice(0, this.currentCaffeineInput.length - 1);
                this.updateCaffeineInputDisplay();
                this.calculate();
            }
        }
    }

    appendNumber(number) {
        if (this.chosenInputDisplay === 'weight') {
            if (this.currentWeightInput === '0' && number === '0') return;
            if (this.currentWeightInput === '0' && number !== '0') this.currentWeightInput = '';

            this.currentWeightInput += number;
            this.updateWeightInputDisplay();
            this.calculate();
        } else if (this.chosenInputDisplay === 'caffeine') {
            if (this.currentCaffeineInput === '0' && number === '0') return;
            if (this.currentCaffeineInput === '0' && number !== '0') this.currentCaffeineInput = '';

            this.currentCaffeineInput += number;
            this.updateCaffeineInputDisplay();
            this.calculate();
        }
    }

    appendDecimal() {
        if (this.chosenInputDisplay === 'weight') {
            if (!this.currentWeightInput.includes('.')) {
                this.currentWeightInput += this.currentWeightInput === '' ? '0.' : '.';
            }

            this.updateWeightInputDisplay();
            this.calculate();
        } else if (this.chosenInputDisplay === 'caffeine') {
            if (!this.currentCaffeineInput.includes('.')) {
                this.currentCaffeineInput += this.currentCaffeineInput === '' ? '0.' : '.';
            }

            this.updateCaffeineInputDisplay();
            this.calculate();
        }
    }

    calculate() {
        if (this.currentWeightInput === '') {
            this.updateResultDisplay('0');
        }

        if (this.currentWeightSystem === 'kg') {
            this.updateResultDisplay(Number(this.currentWeightInput) * 5);
        } else if (this.currentWeightSystem === 'lb') {
            this.updateResultDisplay((Number(this.currentWeightInput / 2.2) * 5).toFixed(2));
        }
    }

    updateResultDisplay(maxCaffeine) {
        this.maxCaffeineResultDisplay.textContent = maxCaffeine;
        this.caffeineLeftResultDisplay.textContent = maxCaffeine ? (Number(maxCaffeine) - Number(this.currentCaffeineInput)).toString() : 0;
    }

    updateWeightInputDisplay() {
        this.weightInputDisplay.textContent = this.currentWeightInput === '' ? 0 : this.currentWeightInput;
    }

    updateCaffeineInputDisplay() {
        this.caffeineInputDisplay.textContent = this.currentCaffeineInput === '' ? 0 : this.currentCaffeineInput;
    }
}