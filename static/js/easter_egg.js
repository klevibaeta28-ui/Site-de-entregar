// Ativação da Animação do Prof. Jose Wilker
function ativarEasterEggProf() {
    const modal = document.getElementById('modal-prof');
    const card = document.getElementById('modal-card');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    }, 50);

    tocarSomFanfarra();
    soltarMaisConfetes();
}

function fecharModalProf() {
    const modal = document.getElementById('modal-prof');
    const card = document.getElementById('modal-card');
    
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function soltarMaisConfetes() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
}

function tocarSomFanfarra() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 329.63, 392.00, 523.25]; // Dó, Mi, Sol, Dó
        notes.forEach((freq, index) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime + index * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.15 + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + index * 0.15);
            osc.stop(audioCtx.currentTime + index * 0.15 + 0.3);
        });
    } catch (e) {
        console.log("Áudio não suportado ou bloqueado no navegador.");
    }
}