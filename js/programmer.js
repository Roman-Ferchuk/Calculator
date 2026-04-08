const sysItems = document.querySelectorAll('.sys-item');
const hexButtons = document.querySelectorAll('.hex-btn');
const decButtons = document.querySelectorAll('.digit-dec');
const binButtons = document.querySelectorAll('.digit-bin'); 

sysItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.sys-item.active').classList.remove('active');
        item.classList.add('active');
        updateKeypad(item.getAttribute('data-sys'));
    });
});

function updateKeypad(mode) {
    if (mode === 'BIN') {
        hexButtons.forEach(b => b.disabled = true);
        decButtons.forEach(b => b.disabled = true);
        binButtons.forEach(b => b.disabled = false); 
    } else if (mode === 'DEC') {
        hexButtons.forEach(b => b.disabled = true);
        decButtons.forEach(b => b.disabled = false);
        binButtons.forEach(b => b.disabled = false); 
    } else if (mode === 'HEX') {
        hexButtons.forEach(b => b.disabled = false);
        decButtons.forEach(b => b.disabled = false);
        binButtons.forEach(b => b.disabled = false);
    }
}