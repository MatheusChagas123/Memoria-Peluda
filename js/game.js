const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'memo-caradesanto',
  'memo-faveladobolado',
  'memo-faveladoclosando',
  'memo-favelanobote',
  'memo-floquinho_closando',
  'memo-floquinhobanhodesol',
  'memo-floquinhogripado',
  'memo-leia',
  'memo-pretaamilanesa',
  'pretadaforofa',
  'memo-pretadandolingua',
  'memo-zeca',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = null;
let secondCard = null;
let intervalId = null;
let startTime = null;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24) {
    clearInterval(intervalId);
    const endTime = new Date();
    const totalTime = Math.floor((endTime - startTime) / 1000);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${totalTime} segundos`);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = null;
    secondCard = null;

    reproduzirSom('parabensSound'); // Chama a função para reproduzir o som de parabéns

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = null;
      secondCard = null;

      reproduzirSom('errouSound'); // Chama a função para reproduzir o som de errou

    }, 500);
  }
};

const reproduzirSom = (idDoElementoDeAudio) => {
  const som = document.getElementById(idDoElementoDeAudio);

  // Verifica se o elemento de áudio existe e é suportado
  if (som && typeof som.play === 'function') {
    som.play();
  } else {
    console.error('Elemento de áudio não encontrado ou não suportado.');
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card') || secondCard !== null) {
    return;
  }

  target.parentNode.classList.add('reveal-card');

  if (firstCard === null) {
    firstCard = target.parentNode;
  } else {
    secondCard = target.parentNode;
    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  startTime = new Date();
  intervalId = setInterval(() => {
    const currentTime = Math.floor((new Date() - startTime) / 1000);
    timer.innerHTML = currentTime;
  }, 1000);
};
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
};
// Adicione este código ao seu arquivo JavaScript
document.getElementById('voltarButton').addEventListener('click', function() {
  window.location.href = '../index.html'; // Substitua o caminho pela localização correta do seu arquivo index.html
});
