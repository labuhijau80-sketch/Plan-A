const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
const cardContainer = document.getElementById('card-container');
const celebrateBtn = document.getElementById('celebrate-btn');

let score = 0;
const targetScore = 5;
const colors = ['#ff5e7e', '#38ef7d', '#11998e', '#ff9f43', '#00d2d3'];
let gameInterval;

function createBalloon() {
    if (score >= targetScore) {
        clearInterval(gameInterval);
        return;
    }

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Posisi horizontal acak agar muat di layar HP
    const randomX = Math.random() * (window.innerWidth - 70);
    balloon.style.left = `${randomX}px`;
    
    // Warna acak
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;

    // Kecepatan melayang acak
    const randomSpeed = 3 + Math.random() * 3;
    balloon.style.animationDuration = `${randomSpeed}s`;

    // Event saat balon diketuk (Touch & Click)
    balloon.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah double click di HP
        popBalloon(balloon);
    });
    balloon.addEventListener('mousedown', () => {
        popBalloon(balloon);
    });

    gameArea.appendChild(balloon);

    // Hapus balon jika lolos ke atas layar tanpa diketuk
    balloon.addEventListener('animationend', () => {
        balloon.remove();
    });
}

function popBalloon(balloon) {
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
}

// Efek tambahan saat tombol di kartu ucapan diketuk
celebrateBtn.addEventListener('click', () => {
    celebrateBtn.textContent = "Terima Kasih! ❤️ by Alip Jaya";
    celebrateBtn.style.background = "#38ef7d";
    // Di sini bisa ditambahkan efek konfeti jika diinginkan
});

// Mulai memunculkan balon setiap 1.2 detik
gameInterval = setInterval(createBalloon, 1200);
