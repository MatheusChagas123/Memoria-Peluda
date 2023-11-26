const input = document.querySelector('.login__input');
const playButton = document.getElementById('playButton');
const tutorialButton = document.getElementById('tutorialButton');
const form = document.querySelector('.login-form');
const tutorialPopup = document.getElementById('tutorialPopup');

// Adicione uma variável de controle para verificar se o vídeo está sendo exibido
let isVideoPlaying = false;

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    playButton.removeAttribute('disabled');
    return;
  }

  playButton.setAttribute('disabled', '');
}

const handlePlay = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location.href = 'pages/game.html';
}

const showTutorial = () => {
  // Seleciona o contêiner com a classe 'tutorial-popup-video'
  const tutorialPopup = document.querySelector('.tutorial-popup-video');

  // Exibe o contêiner alterando seu estilo para 'display: block'
  tutorialPopup.style.display = 'block';

  // Seleciona o elemento de vídeo dentro do contêiner
  const videoElement = tutorialPopup.querySelector('video');

  // Adiciona a propriedade 'autoplay' para iniciar o vídeo automaticamente
  videoElement.play(); // Inicia o vídeo

  // Adiciona um ouvinte de evento para verificar quando o vídeo termina
  videoElement.addEventListener('ended', () => {
    // Fecha o popup quando o vídeo termina
    tutorialPopup.style.display = 'none';
    // Reseta a variável de controle
    isVideoPlaying = false;
  });

  // Atualiza a variável de controle
  isVideoPlaying = true;

  // Faça algo com o valor de videoSrc, se necessário
  console.log('O vídeo está iniciando automaticamente.');
}

const closeTutorial = () => {
  // Verifica se o vídeo está sendo exibido antes de fechar
  if (isVideoPlaying) {
    // Se o vídeo está sendo exibido, para a reprodução
    const videoElement = tutorialPopup.querySelector('video');
    videoElement.pause();
    videoElement.currentTime = 0; // Volta para o início do vídeo
  }
  // Fecha o popup
  tutorialPopup.style.display = 'none';
  // Reseta a variável de controle
  isVideoPlaying = false;
}
input.addEventListener('input', validateInput);
form.addEventListener('submit', handlePlay);
playButton.addEventListener('click', handlePlay);
tutorialButton.addEventListener('click', showTutorial);
document.querySelector('.fechar-popup').addEventListener('click', closeTutorial);
