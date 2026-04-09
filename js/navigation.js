const hamburger = document.getElementById('hamburgerBtn');
const sideDrawer = document.getElementById('sideDrawer');
const overlay = document.getElementById('drawerOverlay');
const mainDisplay = document.querySelector('.display-wrapper');

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

        display.textContent = '';
        historyDisplay.textContent = '';
        expression = [];
        currentInput = '';
        shouldResetScreen = false;

        const modeName = item.textContent.trim();
        document.querySelector('.calc-mode-label').textContent = modeName;

        document.querySelectorAll('.mode-module').forEach(mod => mod.style.display = 'none');
        
        if (modeName === 'Standard') {
            document.getElementById('standard-module').style.display = 'block';
            mainDisplay.style.display = 'flex';         
        } else if (modeName === 'Converter') {
            document.getElementById('converter-module').style.display = 'block';
            mainDisplay.style.display = 'none';         
        } else if (modeName === 'Programmer') {
            document.getElementById('programmer-module').style.display = 'block';
            mainDisplay.style.display = 'flex';
            updateKeypad('DEC');        
        }      
        closeDrawer(); 
    });
});

function closeDrawer() {
    document.getElementById('sideDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('visible');
    document.getElementById('hamburgerBtn').classList.remove('active');
}