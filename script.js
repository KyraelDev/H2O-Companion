const counter = document.getElementById('water-counter');
const addBtn = document.getElementById('addCup');
const removeBtn = document.getElementById('removeBtn');
const resetBtn = document.getElementById('resetBtn');
const setGoalBtn = document.getElementById('setGoalBtn');
const goalInput = document.getElementById('goalInput');
const currentGoal = document.getElementById('currentGoal');
const langBtn = document.getElementById('langBtn');

let count = 0;
let goal = 0;

const translations = {
    it: {
        header: 'H2O Companion',
        description1: 'Questa app ti aiuta a tenere traccia della tua assunzione di acqua.',
        description2: 'Clicca "Aggiungi" per aggiungere un bicchiere d\'acqua, "Rimuovi" per toglierne uno e "Reset" per azzerare il contatore.',
        counterText: 'Bicchieri',
        add: 'Aggiungi',
        remove: 'Rimuovi',
        reset: 'Reset',
        goalLabel: 'Imposta il tuo obiettivo giornaliero di bicchieri d\'acqua',
        goalPlaceholder: 'Obiettivo',
        setGoal: 'Imposta obiettivo',
        currentGoal: 'Attuale',
        congrats: 'Complimenti! Hai raggiunto il tuo obiettivo di idratazione 🎉'
    },
    en: {
        header: 'H2O Companion',
        description1: 'This app helps you track your water intake.',
        description2: 'Click "Add" to add a glass of water, "Remove" to subtract one, and "Reset" to reset the counter.',
        counterText: 'Glasses',
        add: 'Add',
        remove: 'Remove',
        reset: 'Reset',
        goalLabel: 'Set your daily water glass goal',
        goalPlaceholder: 'Goal',
        setGoal: 'Set goal',
        currentGoal: 'Current',
        congrats: 'Congratulations! You reached your hydration goal 🎉'
    }
};

let currentLang = 'it';

// Suono unico per tutti i bottoni
const soundClick = new Audio('assets/click.mp3');
const soundCompleted = new Audio('assets/completed.mp3');

addBtn.addEventListener('click', () => {
    count++;
    updateCounter();
    soundClick.currentTime = 0;
    soundClick.play();
});

removeBtn.addEventListener('click', () => {
    if (count > 0) count--;
    updateCounter();
    soundClick.currentTime = 0;
    soundClick.play();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateCounter();
    soundClick.currentTime = 0;
    soundClick.play();
});

setGoalBtn.addEventListener('click', () => {
    const value = parseInt(goalInput.value, 10);
    if (!isNaN(value) && value > 0) {
        goal = value;
        currentGoal.value = goal;
        goalInput.value = '';
        goalInput.placeholder = 'Obiettivo';
        setGoalBtn.textContent = 'Obiettivo impostato!';
        setTimeout(() => setGoalBtn.textContent = 'Imposta obiettivo', 1200);
    } else {
        goalInput.value = '';
        goalInput.placeholder = 'Inserisci un numero valido';
    }
});

langBtn.addEventListener('click', () => {
    const soundWoosh = new Audio('assets/woosh.mp3');
    soundWoosh.currentTime = 0;
    soundWoosh.play();
    setTimeout(() => {
        currentLang = currentLang === 'it' ? 'en' : 'it';
        applyTranslations();
    }, 200); // attende che il suono parta prima di cambiare lingua
});

document.getElementById('minimizeBtn').addEventListener('click', () => {
    if (window.electronAPI && window.electronAPI.minimize) {
        window.electronAPI.minimize();
    } else if (window.ipcRenderer) {
        window.ipcRenderer.send('minimize-window');
    }
});
document.getElementById('closeBtn').addEventListener('click', () => {
    const soundExit = new Audio('assets/exiting.mp3');
    soundExit.currentTime = 0;
    soundExit.play();
    setTimeout(() => {
        if (window.electronAPI && window.electronAPI.close) {
            window.electronAPI.close();
        } else if (window.ipcRenderer) {
            window.ipcRenderer.send('close-window');
        }
    }, 350); // attende che il suono parta prima di chiudere
});

function applyTranslations() {
    const t = translations[currentLang];
    document.querySelector('.header').textContent = t.header;
    document.querySelector('.description .text').textContent = t.description1;
    document.querySelector('.description br.text').nextSibling.textContent = t.description2;
    document.getElementById('water-counter-text').textContent = t.counterText;
    document.getElementById('addCup').textContent = t.add;
    document.getElementById('removeBtn').textContent = t.remove;
    document.getElementById('resetBtn').textContent = t.reset;
    document.querySelector('.goal-container label').textContent = t.goalLabel;
    document.getElementById('goalInput').placeholder = t.goalPlaceholder;
    document.getElementById('setGoalBtn').textContent = t.setGoal;
    document.getElementById('currentGoal').placeholder = t.currentGoal;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

function updateCounter() {
    counter.textContent = count;
    if (goal > 0 && count >= goal) {
        setTimeout(() => {
            soundCompleted.currentTime = 0;
            soundCompleted.play();
            showToast(translations && translations[currentLang] ? translations[currentLang].congrats : 'Complimenti! Hai raggiunto il tuo obiettivo di idratazione 🎉');
            count = 0;
            counter.textContent = count;
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const soundStarting = new Audio('assets/starting.mp3');
    soundStarting.currentTime = 0;
    soundStarting.play();
});
