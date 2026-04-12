const hamburger = document.getElementById('hamburgerBtn');
const sideDrawer = document.getElementById('sideDrawer');
const overlay = document.getElementById('drawerOverlay');
const mainDisplay = document.querySelector('.display-wrapper');

const standardCalculator = new StandardCalculator();
const converter = new Converter();
const programmerCalculator = new ProgrammerCalculator();

function attachEventListenersForStandard() {
    const standardModule = document.getElementById('standard-module');

    standardModule.querySelectorAll('.btn-number').forEach(btn => {
        btn.addEventListener('click', () => standardCalculator.appendNumber(btn.textContent));
    });

    standardModule.querySelectorAll('.btn-operator').forEach(btn => {
        btn.addEventListener('click', () => standardCalculator.setOperator(btn.textContent));
    });

    standardModule.querySelector('#memory-clear').addEventListener('click', () => standardCalculator.memoryClear());
    standardModule.querySelector('#memory-recall').addEventListener('click', () => standardCalculator.memoryRecall());
    standardModule.querySelector('#memory-add').addEventListener('click', () => standardCalculator.memoryAdd());
    standardModule.querySelector('#memory-subtract').addEventListener('click', () => standardCalculator.memorySubtract());

    standardModule.querySelector('#factorial').addEventListener('click', () => standardCalculator.factorial());
    standardModule.querySelector('#exponent').addEventListener('click', () => standardCalculator.setOperator('^'));
    standardModule.querySelector('#square').addEventListener('click', () => standardCalculator.square());
    standardModule.querySelector('#square-root').addEventListener('click', () => standardCalculator.squareRoot());

    standardModule.querySelector('#clearDisplay').addEventListener('click', () => standardCalculator.clearDisplay());
    standardModule.querySelector('#backspace').addEventListener('click', () => standardCalculator.backspace());
    standardModule.querySelector('#toggleSign').addEventListener('click', () => standardCalculator.toggleSign());
    standardModule.querySelector('#appendPercent').addEventListener('click', () => standardCalculator.appendPercent());

    standardModule.querySelector('#calculate').addEventListener('click', () => standardCalculator.calculate());
    standardModule.querySelector('.btn-decimal').addEventListener('click', () => standardCalculator.appendDecimal());
}

function attachEventListenersForConverter() {
    const converterModule = document.getElementById('converter-module');

    converterModule.querySelectorAll('.btn-number').forEach(btn => {
        btn.addEventListener('click', () => converter.appendNumber(btn.textContent));
    });

    converterModule.querySelector('#clear-display').addEventListener('click', () => converter.clearDisplay());
    converterModule.querySelector('#backspace').addEventListener('click', () => converter.backspace());
    converterModule.querySelector('#append-decimal').addEventListener('click', () => converter.appendDecimal());
}

function attachEventListenersForProgrammer() {
    const programmerModule = document.getElementById('programmer-module');
            
    programmerCalculator.updateKeypad('DEC');      
    
    programmerModule.querySelectorAll('.hex-btn, .digit-dec, .digit-bin').forEach(btn => {
        btn.addEventListener('click', () => programmerCalculator.appendNumber(btn.textContent));
    });

    programmerModule.querySelectorAll('.btn-operator').forEach(btn => {
        btn.addEventListener('click', () => programmerCalculator.setOperator(btn.textContent));
    });

    programmerModule.querySelector('#clear-display').addEventListener('click', () => programmerCalculator.clearDisplay());
    programmerModule.querySelector('#backspace').addEventListener('click', () => programmerCalculator.backspace());
    programmerModule.querySelector('#calculate').addEventListener('click', () => programmerCalculator.calculate());
}

attachEventListenersForStandard();
attachEventListenersForConverter();
attachEventListenersForProgrammer();

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideDrawer.classList.toggle('open');
    overlay.classList.toggle('visible');
});

overlay.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-menu li').forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelector('.drawer-menu li.active').classList.remove('active');
        item.classList.add('active');

        document.getElementById('display').textContent = '';
        document.getElementById('history').textContent = '';

        const modeName = item.textContent.trim();
        document.querySelector('.calc-mode-label').textContent = modeName;

        document.querySelectorAll('.mode-module').forEach(mod => mod.style.display = 'none');
        
        if (modeName === 'Standard') {
            document.getElementById('standard-module').style.display = 'block';
            mainDisplay.style.display = 'flex';

            standardCalculator.reset();
        } else if (modeName === 'Converter') {
            document.getElementById('converter-module').style.display = 'block';
            mainDisplay.style.display = 'none';

            converter.reset();
        } else if (modeName === 'Programmer') {
            document.getElementById('programmer-module').style.display = 'block';
            mainDisplay.style.display = 'flex';

            programmerCalculator.reset();
        }  

        closeDrawer(); 
    });
});

function closeDrawer() {
    document.getElementById('sideDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('visible');
    document.getElementById('hamburgerBtn').classList.remove('active');
}