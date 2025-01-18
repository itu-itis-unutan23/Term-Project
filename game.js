const word = ['N', 'M', 'Y', 'P', 'H'];
let score = 0;
let lives = 3;

const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');
const cards = document.querySelectorAll('.card');

function initializeGame() {
    score = 0;
    lives = 3;
    scoreElement.textContent = score;
    livesElement.innerHTML = '<img src="heart.svg" alt="Heart" class="heart">'.repeat(lives);
    guessInput.value = '';
    cards.forEach(card => {
        card.firstElementChild.src = 'soru.svg';
    });
    resetButton.style.display = 'none';
}

function checkGuess() {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = '';

    if (guess.length === 1) {
        let correct = false;
        cards.forEach(card => {
            if (card.dataset.letter === guess && card.firstElementChild.src.includes('soru.svg')) {
                card.firstElementChild.src = `${guess}.svg`;
                correct = true;
            }
        });

        if (correct) {
            score += 20;
            scoreElement.textContent = score;
        } else {
            loseLife(1); 
        }
    } else if (guess.length > 1) {
        if (guess === word.join('')) {
            score = 100;
            scoreElement.textContent = score;
            winGame();
        } else {
            loseLife(3); 
            if (lives > 0) {
                alert('Wrong guess! Try again.');
            }
        }
    }

    resetButton.style.display = 'block';
    checkWinCondition();
}

function loseLife(livesLost) {
    lives -= livesLost; 
    livesElement.innerHTML = '<img src="heart.svg" alt="Heart" class="heart">'.repeat(lives);
    if (lives <= 0) loseGame();
}

function winGame() {
    score = 100; 
    scoreElement.textContent = score;
    setTimeout(() => {
        alert('Congratulations! You guessed the word correctly!');
    }, 100); 
}

function loseGame() {
    setTimeout(() => {
        alert('Game Over! You lost all your lives.');
    }, 100); 
}

function checkWinCondition() {
    const revealedLetters = Array.from(cards).every(card =>
        !card.firstElementChild.src.includes('soru.svg')
    );

    if (revealedLetters) {
        winGame();
    }
}

function resetGame() {
    initializeGame();
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);

initializeGame();
