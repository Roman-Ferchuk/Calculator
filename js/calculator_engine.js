class CalculatorState {
    constructor() {
        this.expression = [];
        this.currentInput = '';
    }

    validateResult(value) {
        if (!isFinite(value)) return 'Overflow';
        if (isNaN(value)) return 'Error';
        if (Math.abs(value) > Number.MAX_SAFE_INTEGER)  return 'Overflow';
        return null;
    }
}