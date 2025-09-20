// Contador de tempo juntos
function atualizarContador() {
  const inicio = new Date('2025-07-22T00:00:00');
  const agora = new Date();
  const diff = agora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;
}
setInterval(atualizarContador, 1000);
atualizarContador();

// Carrossel de memórias
const memorias = [
    { img: 'imagem1.jpg', alt: 'Memória 1' },
    { img: 'imagem2.jpg', alt: 'Memória 2' },
    { img: 'imagem3.jpg', alt: 'Memória 3' },
    { img: 'imagem4.jpg', alt: 'Memória 4' },
    { img: 'imagem5.jpg', alt: 'Memória 5' },
    { img: 'imagem6.jpg', alt: 'Memória 6' },
    { img: 'imagem7.jpg', alt: 'Memória 7' },
    { img: 'imagem8.jpg', alt: 'Memória 8' },
    { img: 'imagem9.jpg', alt: 'Memória 9' },
    { img: 'imagem10.jpg', alt: 'Memória 10' },
    { img: 'imagem11.jpg', alt: 'Memória 11' },
    { img: 'imagem12.jpg', alt: 'Memória 12' },
    { img: 'imagem13.jpg', alt: 'Memória 13' },
    { img: 'imagem14.jpg', alt: 'Memória 14' },
    { img: 'imagem15.jpg', alt: 'Memória 15' },
    { img: 'imagem16.jpg', alt: 'Memória 16' },
    { img: 'imagem17.jpg', alt: 'Memória 17' },
    { img: 'imagem18.jpg', alt: 'Memória 18' }
];

let memoriaAtual = 0;
let carrosselInterval = null;

function mostrarMemoria(idx) {
    const img = document.getElementById('memoria-img');
    img.src = memorias[idx].img;
    img.alt = memorias[idx].alt;
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
}

function anteriorMemoria() {
    memoriaAtual = (memoriaAtual - 1 + memorias.length) % memorias.length;
    mostrarMemoria(memoriaAtual);
    reiniciarIntervalo();
}

function proximaMemoria() {
    memoriaAtual = (memoriaAtual + 1) % memorias.length;
    mostrarMemoria(memoriaAtual);
    reiniciarIntervalo();
}

function reiniciarIntervalo() {
    if (carrosselInterval) clearInterval(carrosselInterval);
    carrosselInterval = setInterval(() => {
        memoriaAtual = (memoriaAtual + 1) % memorias.length;
        mostrarMemoria(memoriaAtual);
    }, 8000);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const dotsContainer = document.querySelector('.dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        memorias.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => {
                memoriaAtual = i;
                mostrarMemoria(memoriaAtual);
                reiniciarIntervalo();
            };
            dotsContainer.appendChild(dot);
        });
    }
    mostrarMemoria(memoriaAtual);
    reiniciarIntervalo();
});

// Lista de músicas
const musicas = [
    {
        titulo: "ordinary",
        artista: "Alex Warren",
        arquivo: "musica1.mp3",
        capa: "capa1.jpg"
    },
    {
        titulo: "perfect",
        artista: "ed sheeran",
        arquivo: "musica2.mp3",
        capa: "capa2.jpg"
    },
    {
        titulo: "all of me",
        artista: "john legend",
        arquivo: "musica3.mp3",
        capa: "capa3.jpg"
    },
    {
        titulo: "thinking out loud",
        artista: "ed sheeran",
        arquivo: "musica4.mp3",
        capa: "capa4.jpg"
    },
    {
        titulo: "say you won't let go",
        artista: "james arthur",
        arquivo: "musica5.mp3",
        capa: "capa5.jpg"
    },
    {
        titulo: "Ta Vendo Aquela Lua",
        artista: "exaltasamba",
        arquivo: "musica6.mp3",
        capa: "capa6.jpg"
    }
];

let musicaAtual = 0;
let aleatorio = false;

const audio = document.getElementById('player-audio');
const capa = document.getElementById('player-capa');
const titulo = document.getElementById('player-titulo');
const artista = document.getElementById('player-artista');
const playBtn = document.getElementById('player-play');
const pauseBtn = document.getElementById('player-pause');
const anteriorBtn = document.getElementById('player-anterior');
const proximaBtn = document.getElementById('player-proxima');
const shuffleBtn = document.getElementById('player-shuffle');
const volumeBtn = document.getElementById('player-volume');
const volumeIcon = volumeBtn.querySelector('.material-symbols-rounded');
const range = document.getElementById('player-range');
const tempoAtual = document.getElementById('player-tempo-atual');
const tempoTotal = document.getElementById('player-tempo-total');

function carregarMusica(idx) {
    const m = musicas[idx];
    audio.src = m.arquivo;
    capa.src = m.capa;
    titulo.textContent = m.titulo;
    artista.textContent = m.artista;
    range.value = 0;
    tempoAtual.textContent = "0:00";
    tempoTotal.textContent = "0:00";
    audio.load();
    // Gradiente inicial
    range.style.background = `linear-gradient(to right, #8a2be2 0%, #e0e0e0 0%)`;
}

function tocarMusica() {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
}

function pausarMusica() {
    audio.pause();
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
}

function proximaMusica() {
    if (aleatorio) {
        musicaAtual = Math.floor(Math.random() * musicas.length);
    } else {
        musicaAtual = (musicaAtual + 1) % musicas.length;
    }
    carregarMusica(musicaAtual);
    tocarMusica();
}

function anteriorMusica() {
    musicaAtual = (musicaAtual - 1 + musicas.length) % musicas.length;
    carregarMusica(musicaAtual);
    tocarMusica();
}

function atualizarBarra() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        range.value = percent;
        tempoAtual.textContent = formatarTempo(audio.currentTime);
        tempoTotal.textContent = formatarTempo(audio.duration);

        // Atualiza o gradiente da barra
        range.style.background = `linear-gradient(to right, #8a2be2 0%, #8a2be2 ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;
    }
}

function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}

range.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (range.value / 100) * audio.duration;
    }
});

audio.addEventListener('timeupdate', atualizarBarra);
audio.addEventListener('ended', proximaMusica);

playBtn.addEventListener('click', tocarMusica);
pauseBtn.addEventListener('click', pausarMusica);
anteriorBtn.addEventListener('click', anteriorMusica);
proximaBtn.addEventListener('click', proximaMusica);

shuffleBtn.addEventListener('click', () => {
    aleatorio = !aleatorio;
    shuffleBtn.style.color = aleatorio ? "#8a2be2" : "";
});

volumeBtn.addEventListener('click', () => {
    const audio = document.getElementById('player-audio');
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeIcon.textContent = 'volume_off';
    } else {
        volumeIcon.textContent = 'volume_up';
    }
});

// Carregar primeira música ao iniciar
carregarMusica(musicaAtual);