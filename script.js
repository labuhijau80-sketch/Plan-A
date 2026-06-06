const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
const cardContainer = document.getElementById('card-container');
const celebrateBtn = document.getElementById('celebrate-btn');

let score = 0;
const targetScore = 5;
const colors = ['#ff5e7e', '#38ef7d', '#11998e', '#ff9f43', '#00d2d3'];
let gameInterval;
let audioStarted = false;

// --- KONFIGURASI AUDIO ---
const bgMusic = new Audio('https://assets.mixkit.co/active_storage/sfx/123/123-animated.wav'); 
bgMusic.loop = true; 
bgMusic.volume = 0.4; 

const popSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-animated.wav');
popSound.volume = 1.0; 

function startAudio() {
    if (!audioStarted) {
        bgMusic.play().catch(error => console.log("Audio play digagalkan:", error));
        audioStarted = true;
    }
}

function createBalloon() {
    if (score >= targetScore) {
        clearInterval(gameInterval);
        return;
    }

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const randomX = Math.random() * (window.innerWidth - 70);
    balloon.style.left = `${randomX}px`;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;

    const randomSpeed = 3 + Math.random() * 3;
    balloon.style.animationDuration = `${randomSpeed}s`;

    balloon.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        startAudio(); 
        popBalloon(balloon, randomX, balloon.offsetTop, randomColor);
    });
    balloon.addEventListener('mousedown', () => {
        startAudio(); 
        popBalloon(balloon, randomX, balloon.offsetTop, randomColor);
    });

    gameArea.appendChild(balloon);

    balloon.addEventListener('animationend', () => {
        balloon.remove();
    });
}

// --- FUNGSI EFEK VISUAL PARTIKEL PECAH ---
function createParticles(x, y, color) {
    const particleCount = 12; // Jumlah serpihan per balon
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.backgroundColor = color;
        
        // Posisikan serpihan di tengah-tengah balon yang pecah
        particle.style.left = `${x + 30}px`; 
        particle.style.top = `${y + 35}px`;

        // Tentukan arah terbang acak (X dan Y) menggunakan CSS Variables
        const destinationX = (Math.random() - 0.5) * 200 + 'px';
        const destinationY = (Math.random() - 0.5) * 200 + 'px';
        particle.style.setProperty('--x', destinationX);
        particle.style.setProperty('--y', destinationY);

        gameArea.appendChild(particle);

        // Hapus partikel setelah animasinya selesai (0.6 detik)
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function popBalloon(balloon, x, y, color) {
    // 1. Mainkan Suara
    popSound.currentTime = 0; 
    popSound.play();

    // 2. Munculkan Efek Visual Serpihan
    // Menggunakan letak koordinat balon saat ini di layar HP
    const currentY = balloon.getBoundingClientRect().top;
    createParticles(x, currentY, color);

    // 3. Hapus Balon & Update Skor
    balloon.remove();
    score++;
    scoreDisplay.textContent = score;

    if (score >= targetScore) {
        setTimeout(endGame, 500);
    }
}

function endGame() {
    gameContainer.classList.add('hidden');
    cardContainer.classList.remove('hidden');
    bgMusic.volume = 0.2; 
}

celebrateBtn.addEventListener('click', () => {
    celebrateBtn.textContent = "Terima Kasih! ❤️";
    celebrateBtn.style.background = "#38ef7d";
});

gameContainer.addEventListener('touchstart', startAudio);
gameContainer.addEventListener('mousedown', startAudio);

gameInterval = setInterval(createBalloon, 1200);
