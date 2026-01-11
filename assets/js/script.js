function getTimeFromSeconds(segundos) {
    const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    return `${minutos}:${seg}`;
}

const relogio = document.querySelector('.relogio');
const statusDisplay = document.querySelector('.status');
const iniciarBtn = document.querySelector('.iniciar');
const pausarBtn = document.querySelector('.pausar');
const zerarBtn = document.querySelector('.zerar');
const countDisplay = document.querySelector('.pomodoro-count span');



let segundos = 25 * 60;           
let timer;
let isRunning = false;
let isFocusTime = true;           
let pomodoroCount = 0;
let currentCycle = 0;            

let TEMPO_FOCO = 25 * 60;
let TEMPO_PAUSA_CURTA = 5 * 60;
let TEMPO_PAUSA_LONGA = 15 * 60;

function updateDisplay() {
    relogio.innerHTML = getTimeFromSeconds(segundos);
    statusDisplay.textContent = isFocusTime ? 'Foco' : (currentCycle === 4 ? 'Pausa longa' : 'Pausa curta');
    statusDisplay.className = 'status ' + (isFocusTime ? 'foco' : 'pausa');
    countDisplay.textContent = pomodoroCount;
}

function nextPhase() {
    if (isFocusTime) {
        
        pomodoroCount++;                   

        isFocusTime = false;
        currentCycle++;
        
        if (currentCycle === 4) {
            segundos = TEMPO_PAUSA_LONGA;
            
            currentCycle = 0;               
        } else {
            segundos = TEMPO_PAUSA_CURTA;
        }
    } else {
        
        isFocusTime = true;
        segundos = TEMPO_FOCO;
    }
    
    updateDisplay();
}

function iniciaRelogio() {
    if (isRunning) return;
    isRunning = true;
    
    timer = setInterval(() => {
        if (segundos <= 0) {
            clearInterval(timer);
            isRunning = false;
            nextPhase();
            
            iniciaRelogio(); 
            return;
        }
        segundos--;
        updateDisplay();
    }, 1000);
}

function pausar() {
    clearInterval(timer);
    isRunning = false;
}

function zerar() {
    clearInterval(timer);
    isRunning = false;
    isFocusTime = true;
    currentCycle = 0;
    segundos = TEMPO_FOCO;
    pomodoroCount = 0;
    updateDisplay();
}


iniciarBtn.addEventListener('click', () => {
    relogio.classList.remove('pausado');
    iniciaRelogio();
});

pausarBtn.addEventListener('click', () => {
    relogio.classList.add('pausado');
    pausar();
});

zerarBtn.addEventListener('click', zerar);


updateDisplay();




const btnModo25 = document.querySelector('.modo-25-5');
const btnModo50 = document.querySelector('.modo-50-10');

console.log('btnModo25:', btnModo25);
console.log('btnModo50:', btnModo50);

if (btnModo25) {
    btnModo25.addEventListener('click', () => {
        mudarModo(25, 5);
        btnModo25.style.background = 'var(--primary-color-darker)';
        btnModo50.style.background = 'var(--primary-color)';
    });
} else {
    console.error("Botão .25-5 NÃO encontrado no HTML!");
}

if (btnModo50) {
    btnModo50.addEventListener('click', () => {
        mudarModo(50, 10);
        btnModo50.style.background = 'var(--primary-color-darker)';
        btnModo25.style.background = 'var(--primary-color)';
    });
} else {
    console.error("Botão .50-10 NÃO encontrado no HTML!");
}

function mudarModo(tempoFoco, tempoPausaCurta) {
    clearInterval(timer);
    isRunning = false;

    TEMPO_FOCO = tempoFoco * 60;
    TEMPO_PAUSA_CURTA = tempoPausaCurta * 60;

    segundos = TEMPO_FOCO;
    isFocusTime = true;
    currentCycle = 0;
    pomodoroCount = 0;

    updateDisplay();
    
    relogio.classList.add('teste')
}

// Eventos dos modos
btnModo25.addEventListener('click', () => {
    mudarModo(25, 5);

    btnModo50.classList.remove('hidden');
    btnModo25.classList.add('hidden');

    btnModo25.style.background = 'var(--primary-color-darker)';
    btnModo50.style.background = 'var(--primary-color)';
});

btnModo50.addEventListener('click', () => {
    mudarModo(50, 10);

    btnModo25.classList.remove('hidden');
    btnModo50.classList.add('hidden');

    btnModo50.style.background = 'var(--primary-color-darker)';
    btnModo25.style.background = 'var(--primary-color)';
});




console.log("Script.js carregado com sucesso ✓");
console.log("Botão 50/10 encontrado?", btnModo50);

btnModo50?.addEventListener('click', () => {
    console.log("Clicou no modo 50/10! Novo tempo:", getTimeFromSeconds(TEMPO_FOCO));
});
