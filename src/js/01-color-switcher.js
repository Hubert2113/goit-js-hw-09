const $startBtn = document.querySelector('button[data-start]');
const $stopBtn = document.querySelector('button[data-stop]');

$startBtn.parentNode.style.transition = 'background-color 1s linear';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let changingColor = null;

$startBtn.addEventListener('click', () => {
  $startBtn.parentNode.style.backgroundColor = getRandomHexColor();
  changingColor = setInterval(() => {
    $startBtn.parentNode.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if ($startBtn.hasAttribute('disabled') === false) {
    $startBtn.setAttribute('disabled', null);
    $stopBtn.removeAttribute('disabled');
  }
});

$stopBtn.addEventListener('click', () => {
  clearInterval(changingColor);
  if ($stopBtn.hasAttribute('disabled') === false) {
    $stopBtn.setAttribute('disabled', null);
    $startBtn.removeAttribute('disabled');
  }
});
