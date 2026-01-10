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



let segundos = 25 * 60;           // tempo inicial em segundos (25min)
let timer;
let isRunning = false;
let isFocusTime = true;           // true = foco, false = pausa
let pomodoroCount = 0;
let currentCycle = 0;             // conta até 4 para pausa longa

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
        // Acabou um foco → conta como pomodoro concluído!
        pomodoroCount++;                    // ← MOVA PRA CÁ!

        isFocusTime = false;
        currentCycle++;
        
        if (currentCycle === 4) {
            segundos = TEMPO_PAUSA_LONGA;
            // Aqui você pode zerar o ciclo se quiser
            currentCycle = 0;               // ← geralmente zera após pausa longa
        } else {
            segundos = TEMPO_PAUSA_CURTA;
        }
    } else {
        // Acabou pausa → volta pro foco
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
            // Aqui você pode adicionar um som se quiser depois
            iniciaRelogio(); // continua automaticamente pro próximo ciclo
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

// Eventos
iniciarBtn.addEventListener('click', () => {
    relogio.classList.remove('pausado');
    iniciaRelogio();
});

pausarBtn.addEventListener('click', () => {
    relogio.classList.add('pausado');
    pausar();
});

zerarBtn.addEventListener('click', zerar);

// Inicializa na tela
updateDisplay();



// Selecionar os botões de modo
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
    // Primeiro limpa qualquer timer rodando
    clearInterval(timer);
    isRunning = false;

    // Atualiza os tempos globais
    TEMPO_FOCO = tempoFoco * 60;
    TEMPO_PAUSA_CURTA = tempoPausaCurta * 60;
    // TEMPO_PAUSA_LONGA continua 15min (ou ajuste se quiser)

    // Agora configura o estado inicial do novo modo
    segundos = TEMPO_FOCO;          // ← isso é o mais importante!
    isFocusTime = true;
    currentCycle = 0;
    pomodoroCount = 0;

    // Atualiza visualmente tudo de uma vez
    updateDisplay();

    // Atualiza a classe pausado (opcional, mas fica mais consistente)
    
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