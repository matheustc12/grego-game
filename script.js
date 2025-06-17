const greekAlphabet = [
  { letter: 'α', name: 'Alpha' },
  { letter: 'β', name: 'Beta' },
  { letter: 'γ', name: 'Gamma' },
  { letter: 'δ', name: 'Delta' },
  { letter: 'ε', name: 'Epsilon' },
  { letter: 'ζ', name: 'Zeta' },
  { letter: 'η', name: 'Eta' },
  { letter: 'θ', name: 'Theta' },
  { letter: 'ι', name: 'Iota' },
  { letter: 'κ', name: 'Kappa' },
  { letter: 'λ', name: 'Lambda' },
  { letter: 'μ', name: 'Mu' },
  { letter: 'ν', name: 'Nu' },
  { letter: 'ξ', name: 'Xi' },
  { letter: 'ο', name: 'Omicron' },
  { letter: 'π', name: 'Pi' },
  { letter: 'ρ', name: 'Rho' },
  { letter: 'σ', name: 'Sigma' }, // Usado no meio da palavra
  { letter: 'τ', name: 'Tau' },
  { letter: 'υ', name: 'Upsilon' },
  { letter: 'φ', name: 'Phi' },
  { letter: 'χ', name: 'Chi' },
  { letter: 'ψ', name: 'Psi' },
  { letter: 'ω', name: 'Omega' }
];

// Embaralha o alfabeto para variação inicial
let shuffledAlphabet = greekAlphabet.sort(() => Math.random() - 0.5);
let currentIndex = 0;
let score = 0;
let gameActive = true;

const greekLetterElem = document.getElementById('greekLetter');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackElem = document.getElementById('feedback');
const scoreElem = document.getElementById('score');
const endGameBtn = document.getElementById('endGameBtn');
const endMessage = document.getElementById('endMessage');

function showNextLetter() {
  if (!gameActive) return;
  currentIndex = (currentIndex + 1) % shuffledAlphabet.length;
  greekLetterElem.textContent = shuffledAlphabet[currentIndex].letter;
  answerInput.value = '';
  feedbackElem.textContent = '';
  answerInput.focus();
}

submitBtn.addEventListener('click', () => {
  if (!gameActive) return;

  const userAnswer = answerInput.value.trim().toLowerCase();

  if (userAnswer === '') {
    feedbackElem.style.color = 'red';
    feedbackElem.textContent = 'Por favor, digite um nome.';
    return;
  }

  const correctAnswer = shuffledAlphabet[currentIndex].name.toLowerCase();

  if (userAnswer === correctAnswer) {
    score++;
    feedbackElem.style.color = 'green';
    feedbackElem.textContent = 'Correto! 👍';
    scoreElem.textContent = `Pontuação: ${score}`;
    showNextLetter();
  } else {
    feedbackElem.style.color = 'red';
    feedbackElem.textContent = `Errado! A resposta correta é "${shuffledAlphabet[currentIndex].name}". Tente outra!`;
    answerInput.value = '';
    answerInput.focus();
  }
});

// Permitir submeter com Enter
answerInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    submitBtn.click();
  }
});

endGameBtn.addEventListener('click', () => {
  gameActive = false;
  greekLetterElem.textContent = '-';
  feedbackElem.textContent = '';
  endMessage.textContent = `Jogo encerrado! Sua pontuação final foi: ${score}`;
  answerInput.disabled = true;
  submitBtn.disabled = true;
  endGameBtn.disabled = true;
});

// Inicializa o jogo
greekLetterElem.textContent = shuffledAlphabet[currentIndex].letter;
answerInput.focus();
